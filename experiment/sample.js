// initializing
const jsPsych = initJsPsych({
  display_element: "display_stage",
  experiment_width: 1100,
  default_iti: 250,
  on_finish: function () {
    var datajs = jsPsych.data.get().json();
    Qualtrics.SurveyEngine.setEmbeddedData("datajs", datajs);
    jQuery("display_stage").remove();
    jQuery("display_stage_background").remove();
    qthis.clickNextButton();
  },
});

// general variables
const next_text = "次のページへ";

// image
const img_hourglass =
  "https://kai21rilh.github.io/experiment_sample/img/hourglass_animated.gif";

// ID (random digits)
const par_id = jsPsych.randomization.randomInt(10000000, 99999999);

// start (full screen)
const start_experiment = {
  type: jsPsychFullscreen,
  message:
    "<p>それでは、これから実験を開始します。</p><p>まず、画面をフルスクリーン表示に変更します。</p><p>準備ができたら、下のボタンを押してください。</p>",
  button_label: next_text,
  fullscreen_mode: true,
  delay_after: 1000,
};

// demographics
const age = {
  type: jsPsychSurveyText,
  preamble: "最初に、あなた自身のことについて伺います。",
  questions: [
    {
      prompt: "あなたの年齢について回答してください。",
      placeholder: "半角数字のみ（例．34）",
      name: "age",
      columns: 30,
      required: true,
    },
  ],
  button_label: next_text,
};

const sex = {
  type: jsPsychSurveyMultiChoice,
  preamble: "最初に、あなた自身のことについて伺います。",
  questions: [
    {
      prompt: "あなたの性別について回答してください。",
      options: ["男性", "女性", "その他"],
      name: "sex",
      horizontal: true,
      required: true,
    },
  ],
  button_label: next_text,
};

// waiting period
var wp3 = jsPsych.randomization.randomInt(10000, 15000);
const hourglass3 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: img_hourglass,
  stimulus_height: 300,
  maintain_aspect_ratio: true,
  render_on_canvas: false,
  prompt: "<p>しばらくお待ちください・・・</p>",
  choices: "NO_KEYS",
  trial_duration: wp3,
  post_trial_gap: 2000,
};

// end (fullscreen)
const end_experiment = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 1000,
};

// timeline
const questionnaire = {
  timeline: [start_experiment, age, sex, hourglass3, end_experiment],
};
