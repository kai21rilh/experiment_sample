// initializing
const jsPsych = initJsPsych({
  display_element: "display_stage",
  experiment_width: 1100,
  default_iti: 400,
  on_finish: function () {
    var datajs = jsPsych.data.get().json();
    Qualtrics.SurveyEngine.setEmbeddedData("pw", password);
    Qualtrics.SurveyEngine.setEmbeddedData("c1", assignment_c1);
    Qualtrics.SurveyEngine.setEmbeddedData("c2", assignment_c2);
    Qualtrics.SurveyEngine.setEmbeddedData("datajs", datajs);
    jQuery("#display_stage").remove();
    jQuery("#display_stage_background").remove();
  },
});

// password (random digits)
const password = jsPsych.randomization.randomInt(10000, 99999);

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

// loading (e.g., images)
const preload = {
  type: jsPsychPreload,
  auto_preload: true,
};

// test-run (start full-screen mode)
const start = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message:
    "これから、テストランを開始します。<br><br>準備ができたら、下のボタンを押してください。",
  button_label: next_text,
};

// sample questions
const q1 = {
  type: jsPsychSurveyText,
  preamble: "テスト用刺激文です。",
  questions: [
    {
      prompt: "何か数字を入力してください。",
      placeholder: "ここに入力",
      name: "q1",
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
      prompt: "いずれかの選択肢を選択してください。",
      labels: ["選択肢１", "選択肢２", "選択肢３"],
      name: "q2",
      required: true,
    },
  ],
  randomize_question_order: false,
  button_label: next_text,
};

// sample instruction
const inst = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "教示文のテストです。<br><br>下のボタンを押して、先に進んでください。",
  choices: [next_text],
};

// sample image stimulus
var wp = jsPsych.randomization.randomInt(5000, 10000);
const img_stim = {
  type: jsPsychImageKeyboardResponse,
  stimulus: img_hourglass,
  stimulus_width: 240,
  stimulus_height: 180,
  maintain_aspect_ratio: false,
  render_on_canvas: false,
  prompt: "<p>5秒～10秒で先に進みます。</p >",
  choices: "NO_KEYS",
  trial_duration: wp,
  post_trial_gap: 3000,
};

// end the test-run
const end = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "以上でテストランは終了です。<br>最後にパスワードをお伝えします。<br><br>本研究のパスワードは <b>" +
    password +
    ' </b>です。<br><br><font color="#c00000">20秒後にテストランが終了します。忘れずにメモしてください。</font>',
  choices: "NO_KEYS",
  trial_duration: 20000,
};

// exit full-screen mode
const exit_fs = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

// timeline
const questionnaire = {
  timeline: [preload, start, q1, q2, inst, img_stim, end, exit_fs],
};
