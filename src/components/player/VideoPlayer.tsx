"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./VideoPlayer.module.css";

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
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  return (
    <div className={styles.stage}>
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
      </div>
    </div>
  );
}
