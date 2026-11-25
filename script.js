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

updateBudget();
