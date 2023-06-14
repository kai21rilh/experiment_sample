// initializing
const jsPsych = initJsPsych({
  display_element: "display_stage",
  experiment_width: 1100,
  default_iti: 250,
  on_finish: function () {
    jsPsych.data.addProperties({
      test01: "condition A",
      test02: "condition B",
    });
    var datajs = jsPsych.data.get().json();
    Qualtrics.SurveyEngine.setEmbeddedData("datajs", datajs);
    jQuery("display_stage").remove();
    jQuery("display_stage_background").remove();
  },
});

// general variables
const next_text = "先に進む";

// image
const img_hourglass =
  "https://kai21rilh.github.io/experiment_sample/experiment/img/hourglass_animated.gif";

// test-run
const start = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<p>これから、テストランを開始します。</p>" +
    "<p>下のボタンを押して、先に進んでください。</p>",
  choices: [next_text],
};

const q1 = {
  type: jsPsychSurveyText,
  preamble: "テスト用刺激文です。",
  questions: [
    {
      prompt: "30と入力してください。",
      placeholder: "ここに入力",
      name: "question_01",
      columns: 30,
      required: true,
    },
  ],
  button_label: next_text,
};

const q2 = {
  type: jsPsychSurveyLikert,
  preamble: "テスト用刺激文その２です。",
  questions: [
    {
      prompt: "選択肢２を選んでください。",
      labels: ["選択肢１", "選択肢２", "選択肢３"],
      name: "question_02",
      required: true,
    },
  ],
  randomize_question_order: false,
  button_label: next_text,
};

const inst = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<p>教示文のテストです。</p>" +
    "<p>下のボタンを押して、先に進んでください。</p>",
  choices: [next_text],
};

// const buttonpress = {
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: "何かキーを押してください。次の画面に進みます。",
//   choices: "ALL_KEYS",
// }; // does not work ... a bug?

var wp = jsPsych.randomization.randomInt(5000, 10000);
const img_stim = {
  type: jsPsychImageKeyboardResponse,
  stimulus: img_hourglass,
  stimulus_width: 280,
  stimulus_height: 210,
  maintain_aspect_ratio: false,
  render_on_canvas: false,
  prompt: "<p>5秒～10秒で先に進みます。</p >",
  choices: "NO_KEYS",
  trial_duration: wp,
  post_trial_gap: 2000,
};

const end = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<p>以上でテストランは終了です。</p>" +
    '<p style="color:red">※5秒後に自動的に終了します。</p>',
  choices: "NO_KEYS",
  trial_duration: 5000,
};

// timeline
const sample_program = {
  // timeline: [start, q1, q2, inst, buttonpress, img_stim, end],
  timeline: [start, q1, q2, inst, img_stim, end],
};
