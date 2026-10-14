"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./VideoPlayer.module.css";

/** Orientation locking is still experimental, so it is missing from lib.dom. */
type LockableOrientation = ScreenOrientation & {
  lock?: (orientation: "landscape") => Promise<void>;
  unlock?: () => void;
};

type Props = {
  src: string;
  poster: string;
  /** Lesson title, used for the labels of the controls. */
  title: string;
};

/** "754" -> "12:34". Hours are longer than any lesson here, so mm:ss is enough. */
function clock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(whole / 60);
  return `${mins}:${String(whole % 60).padStart(2, "0")}`;
}

/**
 * Native <video> with our own control bar, as the design shows: the browser
 * chrome is off and every button drives the element through its ref. State
 * comes from the element's own events, so the bar stays right even when
 * playback changes from somewhere else (keyboard, picture-in-picture).
 */
export function VideoPlayer({ src, poster, title }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [full, setFull] = useState(false);
  const [wide, setWide] = useState(false);

  // Fullscreen can also be left with Esc or the browser's own chrome, so the
  // document is the source of truth, not the button.
  useEffect(() => {
    function sync() {
      setFull(document.fullscreenElement === stage.current);
    }
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  // The metadata often lands before React attaches its listeners, so read the
  // element once on mount instead of waiting for an event that already fired.
  useEffect(() => {
    const el = video.current;
    if (el?.readyState) setDuration(el.duration);
  }, [src]);

  function toggle() {
    const el = video.current;
    if (!el) return;
    if (el.paused) el.play();
    else el.pause();
  }

  function seek(to: number) {
    if (video.current) video.current.currentTime = to;
    setTime(to);
  }

  async function toggleFullscreen() {
    const orientation = screen.orientation as LockableOrientation | undefined;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      // Give the phone its orientation back when the player closes.
      orientation?.unlock?.();
      return;
    }
    try {
      await stage.current?.requestFullscreen();
      // Phones turn to landscape; desktops and iOS Safari simply refuse, which
      // is fine — the player is already fullscreen by then.
      await orientation?.lock?.("landscape");
    } catch {
      // Embedded or locked-down browsers refuse one or both; the player keeps
      // playing inline rather than breaking.
    }
  }

  return (
    <div ref={stage} className={styles.stage} data-wide={wide || undefined}>
      <video
        ref={video}
        className={styles.video}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      />

      {/* The big centre button is the poster's play affordance and stays as a
          pause target while hovering the video. */}
      <button
        type="button"
        className={styles.big}
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} ${title}`}
      >
        <Icon name={playing ? "pause" : "play"} size={28} />
      </button>

      <div className={styles.bar}>
        <button
          type="button"
          className={styles.control}
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
          <Icon name={playing ? "pause" : "play"} size={18} />
        </button>

        <input
          className={styles.seek}
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
        />

        <span className={styles.time}>
          {clock(time)} / {clock(duration)}
        </span>

        <button
          type="button"
          className={styles.control}
          onClick={() => {
            if (video.current) video.current.muted = !video.current.muted;
          }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          <Icon name={muted ? "muted" : "volume"} size={18} />
        </button>

        {/* Wide is a desktop idea only; the CSS hides it on small screens,
            where the player already fills the width. */}
        <button
          type="button"
          className={`${styles.control} ${styles.wideButton}`}
          onClick={() => setWide((v) => !v)}
          aria-pressed={wide}
          aria-label="Wide mode"
        >
          <Icon name="wide" size={18} />
        </button>

        <button
          type="button"
          className={styles.control}
          onClick={toggleFullscreen}
          aria-label={full ? "Exit fullscreen" : "Fullscreen"}
        >
          <Icon name={full ? "collapse" : "expand"} size={18} />
        </button>
      </div>
    </div>
  );
}
