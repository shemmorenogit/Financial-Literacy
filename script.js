// Money Moves uses sample values only; it never collects financial details.
const startingMoney = 1500;
const sliderNames = ['airtime', 'transport', 'food', 'savings', 'giving', 'wants'];

function formatMoney(amount) {
  return `KSh ${amount.toLocaleString('en-KE')}`;
}

// Recalculate the budget whenever a slider changes.
function updateBudget() {
  const allocations = {};
  let totalAllocated = 0;

  sliderNames.forEach((name) => {
    const slider = document.querySelector(`[data-label="${name}"]`);
    const amount = Number(slider.value);
    allocations[name] = amount;
    totalAllocated += amount;
    document.getElementById(`val-${name}`).textContent = formatMoney(amount);
  });

  const remaining = startingMoney - totalAllocated;
  const remainingPill = document.getElementById('budget-left-pill');
  const progress = document.getElementById('budget-progress-bar');
  const percent = Math.min(100, (totalAllocated / startingMoney) * 100);

  remainingPill.textContent = remaining >= 0
    ? `Left: ${formatMoney(remaining)}`
    : `Deficit: ${formatMoney(Math.abs(remaining))}`;
  remainingPill.classList.toggle('deficit', remaining < 0);
  progress.style.width = `${percent}%`;
  progress.classList.toggle('over', percent > 95);
  progress.parentElement.setAttribute('aria-valuenow', String(Math.round(percent)));
  document.getElementById('saved-total').textContent = `You saved ${formatMoney(allocations.savings)}`;
}

document.querySelectorAll('.slider-row input').forEach((slider) => {
  slider.addEventListener('input', updateBudget);
});

// Show how the three choices affect the student's plan.
const choices = {
  lend: {
    budget: 'KSh 1,200', width: '75%', title: 'Choice: You lent KSh 300',
    text: 'You helped your friend, but your remaining cash for the next 10 days is reduced. An emergency could leave you with no buffer.',
    cost: 'KSh 300 leaves your pocket immediately. That could mean less money for matatu fare and lunch.', badge: 'Social trust tested'
  },
  say_no: {
    budget: 'KSh 1,500 preserved', width: '100%', title: 'Choice: You set a boundary',
    text: 'It may feel awkward for a moment, but your plan stays intact. You could suggest your friend talk to the school bursar or share a snack instead.',
    cost: 'Financial cost: KSh 0. You can be kind while still protecting your own needs.', badge: 'Budget protected'
  },
  fuliza: {
    budget: 'KSh 1,200 + debt', width: '55%', title: 'Caution: Borrowing to lend',
    text: 'If your friend delays repaying you, you are still responsible for the overdraft and any applicable charges.',
    cost: 'Borrowing can add fees and stress. Always check current terms and talk to a trusted adult before using credit.', badge: 'Debt risk'
  }
};

document.querySelectorAll('[data-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    const choice = choices[button.dataset.choice];
    document.querySelectorAll('[data-choice]').forEach((item) => item.classList.toggle('chosen', item === button));
    document.getElementById('dilemma-budget-txt').textContent = choice.budget;
    document.getElementById('dilemma-bar').style.width = choice.width;
    document.getElementById('consequence-title').textContent = choice.title;
    document.getElementById('consequence-text').textContent = choice.text;
    document.getElementById('cost-details').textContent = choice.cost;
    document.getElementById('choice-badge').textContent = choice.badge;
  });
});

// Scam quiz feedback updates immediately when a learner chooses an answer.
document.querySelectorAll('[data-scam-answer]').forEach((button) => {
  button.addEventListener('click', () => {
    const correct = button.dataset.scamAnswer === 'fake';
    document.getElementById('scam-feedback-text').textContent = correct
      ? 'Correct! Asking for an upfront fee is a major red flag. Never pay to claim an unexpected prize.'
      : 'Not quite. The upfront “facilitation fee” is a red flag. Do not send money to claim a prize.';
    document.getElementById('scam-score').textContent = correct ? 'Score: 4 / 5' : 'Score: 2 / 5';
  });
});

// Content for the family money glossary, shown one topic at a time.
const decoderTopics = {
  fuliza: { title: 'Fuliza', badge: 'Overdraft service', what: 'An M-Pesa overdraft that may cover a payment when your balance is too low.', how: 'Money received later may be used to repay the outstanding amount and applicable charges.', risk: 'Charges and borrowing rules can change. Check the current terms with a trusted adult.', ask: 'What does using an overdraft cost our family?' },
  mpesa_go: { title: 'M-Pesa Go', badge: 'Junior account', what: 'A mobile money account designed for young people with parental oversight.', how: 'Parents or guardians can help manage access and limits for everyday payments.', risk: 'Features and fees may vary. Ask a parent to review the current terms together.', ask: 'How can we practice safe mobile money habits together?' },
  chama: { title: 'Chama', badge: 'Group saving', what: 'A group of people who save together and may take turns receiving a pooled amount.', how: 'Members agree on contributions, timing, and how the group will manage its money.', risk: 'Clear rules matter. A member not contributing as agreed can affect the whole group.', ask: 'How does your group make sure its savings plan is fair?' },
  sacco: { title: 'SACCO', badge: 'Cooperative', what: 'A member-owned cooperative where people can save and may access financial services.', how: 'Members pool resources and the SACCO operates under its own rules and terms.', risk: 'Compare fees, withdrawal conditions, and loan terms before joining.', ask: 'What should our family check before choosing a SACCO?' }
};

function showDecoder(topicName) {
  const topic = decoderTopics[topicName];
  document.querySelectorAll('[data-decoder]').forEach((tab) => {
    const active = tab.dataset.decoder === topicName;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  document.getElementById('decoder-content').innerHTML = `
    <strong>${topic.title} <span class="mini-pill">${topic.badge}</span></strong>
    <p><b>What it is:</b> ${topic.what}</p>
    <p><b>How it works:</b> ${topic.how}</p>
    <p><b>One thing to check:</b> ${topic.risk}</p>
    <p class="ask-parent">Ask someone at home: “${topic.ask}”</p>`;
}

document.querySelectorAll('[data-decoder]').forEach((tab) => {
  tab.addEventListener('click', () => showDecoder(tab.dataset.decoder));
});
showDecoder('fuliza');

// Confidence scale state stays on the page and is not saved as personal data.
document.querySelectorAll('[data-confidence]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-confidence]').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.getElementById('after-score').textContent = `${button.dataset.confidence} / 5`;
  });
});

const questions = [
  'How sure am I about borrowing money?',
  'How sure am I about spotting a money scam?',
  'How sure am I about making a monthly spending plan?'
];
let questionIndex = 0;
document.getElementById('next-question').addEventListener('click', () => {
  questionIndex = (questionIndex + 1) % questions.length;
  document.getElementById('confidence-question').textContent = questions[questionIndex];
  document.querySelectorAll('[data-confidence]').forEach((button) => {
    button.classList.toggle('selected', button.dataset.confidence === '3');
    button.setAttribute('aria-pressed', String(button.dataset.confidence === '3'));
  });
  document.getElementById('after-score').textContent = '4 / 5';
});

document.getElementById('try-again').addEventListener('click', () => {
  document.querySelectorAll('.slider-row input').forEach((slider) => {
    const defaults = { airtime: 300, transport: 400, food: 350, savings: 150, giving: 100, wants: 0 };
    slider.value = defaults[slider.dataset.label];
  });
updateBudget();
  document.querySelectorAll('[data-choice]').forEach((button) => button.classList.remove('chosen'));
  document.getElementById('dilemma-budget-txt').textContent = 'KSh 1,200';
  document.getElementById('dilemma-bar').style.width = '75%';
  document.getElementById('consequence-title').textContent = 'See what each choice costs';
  document.getElementById('consequence-text').textContent = 'Tap one of the options to explore the financial and social reality of your choice.';
  document.getElementById('cost-details').textContent = 'Think about how lending affects your own plan, and whether borrowing could add fees.';
  document.getElementById('choice-badge').textContent = 'Pending decision';
  document.getElementById('plan-section').scrollIntoView({ behavior: 'smooth' });
});

// New learning hub features are self-contained so the original Money Moves flow stays intact.
const STORAGE_KEY = 'money-moves-learning-progress-v1';
const emptyProgress = { lessons: {}, quizScores: {}, activities: [], xp: 0, streak: 0, lastVisit: null, badges: [] };
var progressState;
try { progressState = { ...emptyProgress, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
catch { progressState = { ...emptyProgress }; }
function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState)); }
  catch { document.getElementById('progress-dashboard')?.setAttribute('data-save-warning', 'Progress could not be saved on this device.'); }
}
function recordVisit() {
  const today = new Date().toLocaleDateString('en-CA');
  if (progressState.lastVisit !== today) {
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
    progressState.streak = progressState.lastVisit === yesterday ? progressState.streak + 1 : 1;
    progressState.lastVisit = today;
  }
}
function awardXP(points) { progressState.xp += points; }
function earnBadge(name) { if (!progressState.badges.includes(name)) progressState.badges.push(name); }
recordVisit();
saveProgress();

const lessonData = [
  { title: 'Budgeting Basics', slides: ['A budget is a plan for money coming in and going out. It helps you decide before the month decides for you.', 'Start with the amount you actually have. Include allowance, small jobs, gifts, or other reliable income.', 'List needs first: food, transport, school supplies, and safe housing. Their costs can change, so leave a little buffer.', 'Give every shilling a job. If KSh 1,500 comes in, decide what goes to essentials, savings, and fun before spending.', 'Save something first, even if it is small. A regular KSh 50 habit can be easier to keep than waiting for a perfect month.', 'Track what you spend for a week. Tiny purchases add up, and a quick note can reveal where your money goes.', 'If your plan does not fit, adjust the plan—not your essentials. Compare prices, set a limit, or find a trusted adult to talk to.', 'Review at month-end. Keep what worked, learn from surprises, and make next month’s plan more realistic.'], quiz: [['What is the main purpose of a budget?', ['To plan income and spending', 'To spend all money immediately', 'To avoid saving'], 0, 'A budget is a plan that helps you choose where money goes.'], ['Which should usually come first in a tight budget?', ['A new game', 'Essential transport to school', 'A second snack'], 1, 'Needs such as safe transport come before optional extras.'], ['Why track small purchases?', ['They never matter', 'They can add up over time', 'It guarantees more income'], 1, 'Small expenses can add up and change your month.']] },
  { title: 'Saving & Emergency Funds', slides: ['Saving means keeping some money for a future need or goal instead of spending it now.', 'Choose a clear reason to save: school supplies, a course, a family plan, or a small emergency buffer.', 'Make the goal specific. “Save KSh 2,000 for books by August” is easier to follow than “save more.”', 'Build a habit with an amount you can repeat. A small weekly amount is better than a promise that breaks your essentials.', 'An emergency fund is for an unexpected necessary cost, not a planned treat. Keep it separate from everyday spending if possible.', 'If you have no income this month, there is no shame in pausing. Protect essentials and restart when it is safe.', 'Compare where savings are kept. Ask a trusted adult about fees, access, and safety before using a financial service.', 'Celebrate consistency, not just the final amount. Review your goal when your circumstances change.'], quiz: [['What makes a savings goal easier to follow?', ['A specific amount and reason', 'Keeping it secret from yourself', 'Waiting for extra money every time'], 0, 'A clear target and reason help you plan steady steps.'], ['What is an emergency fund meant for?', ['Unexpected necessary costs', 'Every weekend outing', 'A planned birthday gift'], 0, 'Emergency savings are reserved for unexpected needs.'], ['What should you check before choosing a place to save?', ['Fees and access', 'The color of the sign', 'Whether friends use it'], 0, 'Understand fees, access rules, and safety with a trusted adult.']] },
  { title: 'Needs vs Wants', slides: ['A need supports health, safety, learning, or daily life. A want is something enjoyable but not essential right now.', 'Needs can differ by person. School transport may be essential for one learner while another can safely walk.', 'Wants are not bad. Planning for them helps you enjoy them without missing important needs.', 'Ask: “What happens if I do not buy this today?” If the answer is “nothing important,” it may be a want.', 'Some choices sit in the middle. A phone may be needed for safety, but the newest model may be a want.', 'Set a wants limit after essentials and savings. A clear limit makes saying yes or no easier.', 'Pause before buying. Compare prices, wait a day, and check whether the purchase still fits your plan.', 'Needs versus wants is a tool, not a judgment. Be kind to yourself and make choices that fit your situation.'], quiz: [['Which is most likely a need?', ['Safe transport to school', 'A second pair of trendy shoes', 'A premium game skin'], 0, 'Safe transport can be essential for getting to school.'], ['Are wants always bad?', ['Yes, never spend on fun', 'No, plan for them after essentials', 'Only if they are cheap'], 1, 'Wants are okay when they fit a realistic plan.'], ['What is a useful question before a purchase?', ['What happens if I wait?', 'Will everyone notice?', 'Can I borrow for it?'], 0, 'A pause helps you decide whether it is important now.']] },
  { title: 'How Banks Work', slides: ['A bank or other regulated financial institution can help people hold money and make payments.', 'A deposit is money placed in an account. Ask about fees, access, and any rules before opening or using an account.', 'A balance is the amount recorded in an account. Check statements or transaction messages to understand changes.', 'Banks may lend money and charge interest. Borrowing is a responsibility and costs more than the amount borrowed.', 'Interest on savings may help money grow, but rates and conditions vary. Ask a trusted adult to help compare options.', 'Keep PINs and passwords private. A real helper should not ask you to share them in a text or phone call.', 'Use official contact details when you have a question. Do not follow unknown links claiming to be your bank.', 'Financial services have different rules. Check current terms with a parent, guardian, or qualified adult before deciding.'], quiz: [['What is a deposit?', ['Money placed into an account', 'A password', 'A loan fee'], 0, 'A deposit is money added to an account.'], ['Should you share your PIN in a text?', ['Yes, if it looks official', 'No, keep it private', 'Only with a friend'], 1, 'Keep PINs private and verify requests through official channels.'], ['What should you check before using an account?', ['Fees and access rules', 'A social media comment', 'A forwarded link'], 0, 'Understand current terms before making a choice.']] },
  { title: 'Credit & Debt', slides: ['Credit is money borrowed with an agreement to repay. Debt is the amount still owed.', 'Borrowing can help with a necessary cost, but it creates a future payment. Do not borrow without understanding the terms.', 'Interest is the cost of borrowing. Fees may also apply, so the total repaid can be higher than the amount received.', 'A minimum payment is the smallest amount due under an agreement. Paying only that amount can make repayment take longer.', 'Before borrowing, check the rate, fees, due dates, total repayment, and what happens if a payment is late.', 'Avoid borrowing to cover another loan unless a trusted financial professional has reviewed the full situation.', 'A credit record may reflect repayment history and can affect future access to credit. Protect your details and ask questions.', 'If debt feels confusing or stressful, talk to a trusted adult or qualified adviser early. You deserve support.'], quiz: [['What is interest on a loan?', ['The cost of borrowing', 'A reward for paying late', 'The original amount borrowed'], 0, 'Interest is an additional borrowing cost.'], ['What should you compare before borrowing?', ['Total repayment and fees', 'Only the advertised amount', 'A friend’s guess'], 0, 'Rates, fees, dates, and total repayment matter.'], ['What can happen when you pay only the minimum?', ['Repayment may take longer', 'The debt disappears instantly', 'There are never any fees'], 0, 'Minimum payments can extend the time and total cost.']] },
  { title: 'Compound Interest', slides: ['Interest is money earned on savings or paid for borrowing. The rate and timing matter.', 'With compound growth, interest can be added to a balance, and future interest may apply to the larger balance.', 'Starting early gives savings more time to grow. Regular contributions can matter as much as the starting amount.', 'Example: save KSh 1,000 and earn interest; later growth can include interest on earlier interest.', 'Compounding also works against you with debt. Interest can build on an unpaid balance, so understand costs.', 'Rates are not guaranteed and can change. A calculator shows an estimate, not a promise.', 'Inflation changes what money can buy. A balance that grows may still buy less if prices rise faster.', 'Use time, consistency, and careful comparisons. Never invest or borrow just because a calculator shows a big number.'], quiz: [['What does compounding mean?', ['Growth can include interest already added', 'Interest is always paid daily', 'Money cannot change'], 0, 'Compound growth can include prior interest in later calculations.'], ['What happens when you contribute regularly?', ['It can increase the amount invested over time', 'It guarantees a profit', 'It removes all risk'], 0, 'Regular contributions add to the balance but do not guarantee a return.'], ['Are calculator results guaranteed?', ['Yes, always', 'No, they are estimates based on assumptions', 'Only for cash'], 1, 'Rates and real outcomes can change.']] },
  { title: 'Investing Basics', slides: ['Investing means putting money into an asset with the hope it may grow over time. Growth is never guaranteed.', 'Investments can rise or fall in value. You could lose some or all of the money invested.', 'Risk and potential return are connected. Promises of high returns with no risk deserve extra caution.', 'Diversification means spreading money across different investments instead of relying on one.', 'Time horizon is how long you can leave money invested. Money needed soon usually should not face high risk.', 'Fees reduce returns. Ask what charges apply and how they are calculated before making a decision.', 'Only use regulated, understandable services and seek guidance from a trusted adult or qualified adviser.', 'Learn first, protect essentials, and never invest money you cannot afford to lose.'], quiz: [['Can an investment guarantee a profit?', ['Yes, if a message says so', 'No, values can rise or fall', 'Only a fast investment'], 1, 'Investments involve risk and returns are not guaranteed.'], ['What is diversification?', ['Spreading investments across assets', 'Putting everything in one place', 'Borrowing more'], 0, 'Diversification reduces reliance on a single investment.'], ['What should you understand before investing?', ['Risks and fees', 'Only the best-case return', 'A stranger’s password'], 0, 'Understand costs and possible losses before deciding.']] },
  { title: 'Avoiding Scams', slides: ['A scam tries to trick you into sharing money, passwords, or private information.', 'Urgency is a warning sign: “act now” can be used to stop you from thinking carefully.', 'Unexpected prizes that ask for an upfront fee are suspicious. Do not pay to claim a prize you did not enter.', 'Never share PINs, one-time codes, or passwords with callers or message senders—even if they know your name.', 'Check the sender through an official website or phone number you find yourself, not the link in the message.', 'If a message feels wrong, pause, show a trusted adult, and report or block it using official channels.', 'Scammers may use familiar names, logos, or local language. A convincing look does not prove a message is real.', 'If you already shared details, tell a trusted adult and contact the service provider through an official channel quickly.'], quiz: [['A message asks for a fee to release a prize. What is the safest response?', ['Pay quickly', 'Pause and verify; do not pay', 'Send your PIN'], 1, 'Upfront prize fees are a common red flag.'], ['How should you verify a bank message?', ['Use an official number you find yourself', 'Click its shortened link', 'Reply with your one-time code'], 0, 'Use contact details from a trusted official source.'], ['Who should know if you shared a password by mistake?', ['A trusted adult and the official provider', 'Nobody', 'The sender'], 0, 'Act quickly with trusted help and contact the provider safely.']] },
  { title: 'Setting Money Goals', slides: ['A money goal gives your saving a purpose. It can be a short-term need or a longer-term plan.', 'Make it specific: name the goal, amount, and target date.', 'Break the total into smaller steps. A KSh 6,000 goal over six months means planning about KSh 1,000 each month.', 'Check whether the monthly amount fits after essentials. Do not sacrifice food, safety, or school needs.', 'Keep track of progress and celebrate small milestones along the way.', 'If your income or costs change, adjust the timeline. Changing a goal is planning—not failure.', 'Compare ways to reach the goal. Saving, waiting, or choosing a lower-cost option may be safer than borrowing.', 'Review your goal regularly and make your next small step achievable.'], quiz: [['What are the parts of a clear money goal?', ['Reason, amount, and timeline', 'A wish and a secret', 'A loan and a deadline'], 0, 'A clear goal states what, how much, and by when.'], ['What if your monthly saving amount is not affordable?', ['Ignore essential needs', 'Adjust the timeline or goal', 'Borrow without checking terms'], 1, 'Protect essentials and adapt the plan.'], ['Is changing a goal a failure?', ['Yes', 'No, plans can adapt when life changes', 'Only if you save monthly'], 1, 'A realistic plan can change as circumstances change.']] }
];

const miniQuestions = [
  [['Which is usually a need?', ['Safe school transport', 'A new game'], 0], ['What helps a budget stay realistic?', ['Leave room for changing costs', 'Spend every shilling'], 0]],
  [['What makes a savings goal clear?', ['A purpose and amount', 'A vague wish'], 0], ['What is an emergency fund for?', ['Unexpected essential costs', 'Planned treats'], 0]],
  [['Which is most likely a need?', ['Safe school transport', 'A premium game skin'], 0], ['Are wants always bad?', ['No, plan for them after essentials', 'Yes, never spend on fun'], 0]],
  [['What should you check before using an account?', ['Fees and access rules', 'A forwarded link'], 0], ['Should you share a PIN in a message?', ['No, keep it private', 'Yes, if it looks official'], 0]],
  [['What is interest on a loan?', ['The cost of borrowing', 'The original amount'], 0], ['What can minimum payments do?', ['Make repayment take longer', 'Erase debt instantly'], 0]],
  [['What does compounding mean?', ['Growth can include earlier interest', 'A guaranteed profit'], 0], ['Are calculator projections guaranteed?', ['No, they are estimates', 'Yes, always'], 0]],
  [['Can an investment guarantee a profit?', ['No, its value can rise or fall', 'Yes, if it is popular'], 0], ['What is diversification?', ['Spreading investments', 'Putting everything in one asset'], 0]],
  [['A prize asks for an upfront fee. What is safest?', ['Pause and verify; do not pay', 'Pay quickly'], 0], ['How should you verify a bank message?', ['Use an official number you find yourself', 'Reply with your code'], 0]],
  [['What belongs in a clear money goal?', ['Reason, amount, and timeline', 'Only a wish'], 0], ['What if your saving amount is too high?', ['Adjust the goal or timeline', 'Ignore essential needs'], 0]]
];
const lessonList = document.getElementById('lesson-list');
let activeLesson = 0;
let activeSlide = 0;
let activeQuiz = 0;
let quizCorrect = 0;
let quizStarted = false;

function renderLessonList() {
  lessonList.replaceChildren();
  lessonData.forEach((lesson, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lesson-choice';
    button.setAttribute('aria-current', String(index === activeLesson));
    button.innerHTML = `<span class="lesson-choice-number">${String(index + 1).padStart(2, '0')}</span><span>${lesson.title}</span><span class="lesson-done-mark" aria-hidden="true">✓</span>`;
    button.addEventListener('click', () => { activeLesson = index; activeSlide = 0; quizStarted = false; document.getElementById('lesson-quiz').hidden = true; document.querySelector('.lesson-slide').hidden = false; document.querySelector('.lesson-controls').hidden = false; renderLessonList(); renderLesson(); });
    lessonList.append(button);
  });
  document.getElementById('lesson-completion-summary').textContent = `${Object.keys(progressState.lessons).length} of ${lessonData.length} lessons completed`;
  lessonList.querySelectorAll('.lesson-choice').forEach((button, index) => {
    if (progressState.lessons[index] !== undefined) button.classList.add('completed');
    button.setAttribute('aria-current', String(index === activeLesson));
  });
}

function renderLesson() {
  const lesson = lessonData[activeLesson];
  const atQuiz = quizStarted;
  document.getElementById('lesson-title').textContent = lesson.title;
  document.getElementById('lesson-category').textContent = `Lesson ${activeLesson + 1} · ${activeSlide + 1} of ${lesson.slides.length}`;
  document.getElementById('slide-counter').textContent = `${activeSlide + 1} of ${lesson.slides.length}`;
  document.getElementById('slide-heading').textContent = lesson.slides[activeSlide].split('.')[0];
  document.getElementById('slide-copy').textContent = lesson.slides[activeSlide];
  document.getElementById('lesson-icon').textContent = String(activeLesson + 1).padStart(2, '0');
  const percent = Math.round(((activeSlide + 1) / lesson.slides.length) * 100);
  document.getElementById('lesson-progress-bar').style.width = `${percent}%`;
  document.querySelector('.lesson-progress').setAttribute('aria-valuenow', String(percent));
  document.getElementById('lesson-back').disabled = activeSlide === 0;
  document.getElementById('lesson-next').textContent = activeSlide === lesson.slides.length - 1 ? 'Start quiz →' : 'Next →';
  const mini = document.getElementById('mini-question');
  if (activeSlide === 2 || activeSlide === 5) {
    const promptData = miniQuestions[activeLesson][activeSlide === 2 ? 0 : 1];
    const prompt = [`Quick check: ${promptData[0]}`, promptData[1], promptData[2]];
    mini.hidden = false;
    document.getElementById('mini-question-text').textContent = prompt[0];
    document.getElementById('mini-question-feedback').textContent = '';
    const options = document.getElementById('mini-question-options');
    options.replaceChildren();
    prompt[1].forEach((label, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'mini-answer'; button.textContent = label;
      button.addEventListener('click', () => { document.getElementById('mini-question-feedback').textContent = index === prompt[2] ? 'That’s right. Nice thinking.' : `Not quite. ${prompt[1][prompt[2]]} is the better choice.`; }); options.append(button);
    });
  } else { mini.hidden = true; }
}

function startQuiz() {
  quizStarted = true; activeQuiz = 0; quizCorrect = 0;
  document.querySelector('.lesson-slide').hidden = true;
  document.querySelector('.lesson-controls').hidden = true;
  document.getElementById('lesson-quiz').hidden = false;
  document.getElementById('quiz-retry').hidden = true;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const quiz = lessonData[activeLesson].quiz;
  const container = document.getElementById('quiz-body');
  container.replaceChildren();
  document.getElementById('quiz-title').textContent = `Question ${activeQuiz + 1} of ${quiz.length}`;
  if (activeQuiz >= quiz.length) {
    const score = quizCorrect;
    const result = document.createElement('div'); result.className = 'quiz-result';
    const heading = document.createElement('h4'); heading.textContent = `You scored ${score} / ${quiz.length}`;
    const note = document.createElement('p'); note.textContent = score === quiz.length ? 'Excellent work—you have a strong grasp of this lesson.' : 'Good practice. Review the lesson and give it another try when you’re ready.';
    result.append(heading, note); container.append(result);
    const previous = progressState.lessons[activeLesson];
    progressState.lessons[activeLesson] = Math.max(previous?.score ?? 0, score);
    progressState.quizScores[activeLesson] = score;
    if (!previous) awardXP(25);
    recordVisit(); saveProgress(); renderDashboard(); renderLessonList();
    document.getElementById('quiz-title').textContent = 'Lesson complete';
    document.getElementById('quiz-retry').hidden = false;
    document.getElementById('lesson-next').textContent = 'Continue slides →';
    return;
  }
  const [question, answers, correctIndex, explanation] = quiz[activeQuiz];
  const prompt = document.createElement('p'); prompt.className = 'quiz-question'; prompt.textContent = question; container.append(prompt);
  const choices = document.createElement('div'); choices.className = 'quiz-options';
  answers.forEach((answer, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'quiz-option'; button.textContent = answer;
    button.addEventListener('click', () => {
      if (choices.dataset.answered) return;
      choices.dataset.answered = 'true';
      const correct = index === correctIndex;
      if (correct) quizCorrect += 1;
      button.classList.add(correct ? 'is-correct' : 'is-incorrect');
      choices.querySelectorAll('button').forEach((item, itemIndex) => { if (itemIndex === correctIndex) item.classList.add('is-correct'); item.disabled = true; });
      const feedback = document.createElement('p'); feedback.className = `quiz-feedback ${correct ? 'correct' : 'incorrect'}`; feedback.textContent = `${correct ? 'Correct.' : 'Not quite.'} ${explanation}`;
      const next = document.createElement('button'); next.type = 'button'; next.className = 'button button-primary'; next.textContent = activeQuiz === quiz.length - 1 ? 'See score →' : 'Next question →'; next.addEventListener('click', () => { activeQuiz += 1; renderQuizQuestion(); });
      container.append(feedback, next);
    }); choices.append(button);
  });
  container.append(choices);
}

document.getElementById('lesson-back').addEventListener('click', () => { if (activeSlide > 0) { activeSlide -= 1; renderLesson(); } });
document.getElementById('lesson-next').addEventListener('click', () => {
  if (quizStarted) { quizStarted = false; activeSlide = 0; document.getElementById('lesson-quiz').hidden = true; document.querySelector('.lesson-slide').hidden = false; document.querySelector('.lesson-controls').hidden = false; renderLesson(); return; }
  if (activeSlide === lessonData[activeLesson].slides.length - 1) startQuiz(); else { activeSlide += 1; renderLesson(); }
});
document.getElementById('quiz-retry').addEventListener('click', startQuiz);
document.addEventListener('keydown', (event) => {
  const active = document.activeElement;
  if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(active?.tagName) || quizStarted) return;
  if (event.key === 'ArrowRight' && activeSlide < lessonData[activeLesson].slides.length - 1) { activeSlide += 1; renderLesson(); }
  if (event.key === 'ArrowLeft' && activeSlide > 0) { activeSlide -= 1; renderLesson(); }
});
renderLessonList(); renderLesson();

updateBudget();

// Give each learning module its own shareable page while keeping the existing
// interactions and progress state available across the whole experience.
const pageSections = [...document.querySelectorAll('main > .content-section')];
const pageTargets = new Map(pageSections.map((section) => [section.id, section]));
const heroSection = document.querySelector('.hero');
function showPage(pageId, { focus = false } = {}) {
  const target = pageTargets.get(pageId);
  const isHome = !target;
  document.body.dataset.currentPage = isHome ? 'home' : pageId;
  if (heroSection) heroSection.hidden = !isHome;
  pageSections.forEach((section) => { section.hidden = section !== target; });
  document.querySelectorAll('.desktop-nav a, .hub-nav a, .quick-links a').forEach((link) => {
    const destination = link.dataset.page || link.hash.slice(1);
    if (destination && pageTargets.has(destination)) {
      link.href = `?page=${encodeURIComponent(destination)}`;
      if (link.closest('.desktop-nav')) {
        if (destination === pageId) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      }
    }
  });
  if (focus && target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function routeFromLocation() {
  showPage(new URLSearchParams(window.location.search).get('page'));
}
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const pageId = link.hash.slice(1);
  if (!pageTargets.has(pageId)) return;
  event.preventDefault();
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set('page', pageId);
  nextUrl.hash = '';
  window.history.pushState({}, '', nextUrl);
  showPage(pageId, { focus: true });
});
window.addEventListener('popstate', routeFromLocation);
routeFromLocation();
