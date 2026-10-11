/**
 * Eng. Ali Shaheen talking to the student in Egyptian Arabic: encouraging at the
 * bottom, a bit strict in the middle, proud at the top.
 *
 * `{percent}` is replaced with how many of the other students the learner is ahead of.
 */
type Level = {
  /** Lower bound of the course progress band, in percent. */
  min: number;
  messages: string[];
};

const LEVELS: Level[] = [
  {
    min: 0,
    messages: [
      "لسه في أول الطريق يا صاحبي.. انت دلوقتي قدام {percent}% بس من الطلبة. ذاكر درسين النهاردة وهتلاقي الترتيب اتغير بكرة 💪",
      "البداية دايماً هي أصعب حاجة.. افتح أول درس وخلصه، بعد كده الباقي بيمشي لوحده 🔥",
      "مفيش حد بدأ وهو شاطر.. انت قدام {percent}% من الطلبة، وأنا عايزك فوق. يلا نبدأ 👀",
    ],
  },
  {
    min: 30,
    messages: [
      "تمام كده.. بقيت أحسن من {percent}% من الطلبة. بس لسه بدري على الراحة، كمّل 🔥",
      "ماشي في السكة صح، لكن أنا شايف إنك ممكن تعمل أحسن من كده بكتير.. شد حيلك شوية 💪",
      "نص الطريق تقريباً.. متقفش هنا، الناس اللي فوقك في الليدر بورد مش أشطر منك، بس مكمّلين 👀",
    ],
  },
  {
    min: 60,
    messages: [
      "عظيم يا صديقي.. أداءك في الكورس ده أفضل من {percent}% من باقي الطلبة.. كمّل عايز أشوف اسمك في الليدر بورد هنا 💪",
      "شغل محترم والله.. انت قدام {percent}% من الطلبة. فاضل شوية صغيرة وتبقى في المقدمة 🔥",
      "أنا مبسوط من مستواك، بس مش هرضى بأقل من إنك تخلص الكورس كله 👀",
    ],
  },
  {
    min: 85,
    messages: [
      "ده الكلام.. أفضل من {percent}% من الطلبة! خلّص اللي فاضل وتعالى أشوف اسمك في أول القايمة 🔥",
      "برافو عليك بجد.. المستوى ده مش بيوصله غير اللي بيذاكر بجد. كمّل لحد الآخر 💪",
      "انت دلوقتي من أحسن الطلبة في الكورس.. فاضل القليل، متضيعش المجهود ده 👀",
    ],
  },
];

/**
 * @param progress Course completion, 0-100.
 * @param beatPercent Share of other students the learner is ahead of, 0-100.
 */
export function getCoachMessage(progress: number, beatPercent: number): string {
  const level = LEVELS.reduce((best, l) => (progress >= l.min ? l : best), LEVELS[0]);
  // Deterministic pick so the server and the client render the same message.
  const message = level.messages[Math.round(progress) % level.messages.length];
  return message.replace("{percent}", String(Math.round(beatPercent)));
}
