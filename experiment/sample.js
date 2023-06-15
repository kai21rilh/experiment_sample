// initializing
const jsPsych = initJsPsych({
  display_element: "display_stage",
  experiment_width: 1100,
  default_iti: 250,
  on_finish: function () {
    var datajs = jsPsych.data.get().json();
    Qualtrics.SurveyEngine.setEmbeddedData("idnum", idnum);
    Qualtrics.SurveyEngine.setEmbeddedData("assignment_c1", assignment_c1);
    Qualtrics.SurveyEngine.setEmbeddedData("assignment_c2", assignment_c2);
    Qualtrics.SurveyEngine.setEmbeddedData("datajs", datajs);
    jQuery("#display_stage").remove();
    jQuery("#display_stage_background").remove();
  },
});

// id (random digits)
const idnum = jsPsych.randomization.randomInt(10000000, 99999999);

// condition assignment
// define levels
const levels_c1 = ["A", "B"];
const levels_c2 = ["a", "b", "c"];
// define assignment (array output)
const result_c1 = jsPsych.randomization.sampleWithoutReplacement(
  (array = levels_c1),
  (sampleSize = 1)
);
const result_c2 = jsPsych.randomization.sampleWithoutReplacement(
  (array = levels_c2),
  (sampleSize = 1)
);
// convert to string
const assignment_c1 = result_c1.toString();
const assignment_c2 = result_c2.toString();

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
    "<p>最後にID番号をお伝えします。<br>この番号は、あなた個人に割り当てられるものです。</p>" +
    "<p>あなたのIDは <b>" +
    idnum +
    " </b>です。</p>" +
    '<p style="color:red">30秒後にテストランが終了します。忘れずにID番号をメモしてください。',
  choices: "NO_KEYS",
  trial_duration: 30000,
};

// timeline
const sample_program = {
  // timeline: [start, q1, q2, inst, buttonpress, img_stim, end],
  timeline: [start, q1, q2, inst, img_stim, end],
};
