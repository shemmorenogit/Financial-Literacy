const currencyFormats = { KES: ['KSh', 'en-KE'], USD: ['$', 'en-US'], EUR: ['€', 'de-DE'], GBP: ['£', 'en-GB'], TZS: ['TSh', 'sw-TZ'], UGX: ['USh', 'en-UG'] };
let selectedCurrency = 'KES';
function money(value) { const [symbol, locale] = currencyFormats[selectedCurrency]; return `${symbol} ${Math.round(Number(value) || 0).toLocaleString(locale)}`; }
function refreshCurrencyLabels() { document.querySelectorAll('[data-currency-code]').forEach((node) => { node.textContent = selectedCurrency; }); }
function renderDashboard() {
  const badgeRules = { 'First Lesson': Object.keys(progressState.lessons).length > 0, 'Budget Pro': progressState.activities.includes('budget-builder'), 'Scam Spotter': progressState.activities.includes('scam-game'), 'Goal Getter': progressState.activities.includes('goal-planner'), 'Growth Mindset': progressState.activities.includes('interest-calculator'), 'Debt Detective': progressState.activities.includes('debt-simulator'), 'Word Collector': progressState.activities.includes('flashcards'), 'Choice Champion': progressState.activities.includes('money-choices') };
  Object.entries(badgeRules).forEach(([name, earned]) => { if (earned && !progressState.badges.includes(name)) progressState.badges.push(name); });
  const xp = progressState.xp; const levels = ['Money Starter', 'Smart Planner', 'Money Mover', 'Money Mentor', 'Money Champion']; const level = Math.min(Math.floor(xp / 100), levels.length - 1); const pct = level === levels.length - 1 ? 100 : xp % 100;
  document.getElementById('level-title').textContent = levels[level]; document.getElementById('xp-total').textContent = `${xp} XP`; document.getElementById('xp-next').textContent = level === levels.length - 1 ? 'Highest level reached' : `${100 - pct} XP to next level`; document.getElementById('xp-progress').style.width = `${pct}%`; document.getElementById('streak-count').textContent = `${progressState.streak} ${progressState.streak === 1 ? 'day' : 'days'}`;
  const lessonBox = document.getElementById('completed-lessons'); lessonBox.replaceChildren(); const lessonEntries = Object.entries(progressState.lessons);
  if (!lessonEntries.length) lessonBox.append(makeNode('p', 'Finish a lesson quiz to see it here.'));
  lessonEntries.forEach(([id, result]) => { const row = document.createElement('div'); row.className = 'progress-row'; row.append(makeNode('span', lessonData[Number(id)]?.title || 'Lesson'), makeNode('strong', `Quiz ${result.score} / 3`)); lessonBox.append(row); });
  const badgeBox = document.getElementById('earned-badges'); badgeBox.replaceChildren();
  if (!progressState.badges.length) badgeBox.append(makeNode('p', 'Complete an activity to earn your first badge.'));
  progressState.badges.forEach((name) => { const badge = makeNode('span', name); badge.className = 'earned-badge'; badgeBox.append(badge); });
  const activityBox = document.getElementById('progress-details'); activityBox.replaceChildren();
  if (!progressState.activities.length) activityBox.append(makeNode('p', 'Your quiz scores and finished activities will appear here.'));
  progressState.activities.forEach((id) => { const row = document.createElement('div'); row.className = 'progress-row'; row.append(makeNode('span', document.querySelector(`[data-activity="${id}"] h3`)?.textContent || id), makeNode('strong', 'Finished')); activityBox.append(row); });
  document.getElementById('activity-count').textContent = `${progressState.activities.length} activities finished`;
  document.getElementById('lesson-completion-summary').textContent = `${lessonEntries.length} of ${lessonData.length} lessons completed`;
  saveProgress();
}
function makeNode(tag, text) { const node = document.createElement(tag); node.textContent = text; return node; }
function completeActivity(id) {
  if (!progressState.activities.includes(id)) { progressState.activities.push(id); awardXP(15); }
  recordVisit(); renderDashboard();
  const button = document.querySelector(`[data-activity="${id}"] .mark-activity`); if (button) { button.textContent = 'Activity completed'; button.disabled = true; }
}
document.querySelectorAll('.mark-activity').forEach((button) => button.addEventListener('click', () => completeActivity(button.closest('[data-activity]').dataset.activity)));

const tips = ['Write down your spending for a week to spot patterns.', 'Compare total cost—not just the first payment—before borrowing.', 'A small emergency buffer can make an unexpected cost less stressful.', 'Pause before clicking a money link. Verify through an official channel.', 'Save a little first when you can, then plan what remains.', 'Ask about fees and access before choosing a financial service.', 'Needs first, then savings, then wants: a simple order can help.', 'Never share your PIN or one-time code, even with someone claiming to help.', 'A realistic goal fits your essentials and your real income.', 'Talk with a trusted adult if a money offer feels urgent or confusing.'];
const today = new Date(); const dayNumber = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
document.getElementById('daily-tip-text').textContent = tips[dayNumber % tips.length];
const currencySelect = document.getElementById('currency-select');
currencySelect.addEventListener('change', (event) => { selectedCurrency = event.target.value; refreshCurrencyLabels(); updateBudgetBuilder(); updateGoalPlanner(); updateInterest(); updateDebt(); });
const themeButton = document.getElementById('theme-toggle');
try { if (localStorage.getItem('money-moves-theme') === 'dark') document.body.classList.add('dark-theme'); } catch {}
function syncThemeButton() { const dark = document.body.classList.contains('dark-theme'); themeButton.textContent = dark ? 'Light mode' : 'Dark mode'; themeButton.setAttribute('aria-pressed', String(dark)); }
themeButton.addEventListener('click', () => { document.body.classList.toggle('dark-theme'); try { localStorage.setItem('money-moves-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light'); } catch {} syncThemeButton(); }); syncThemeButton();

function updateBudgetBuilder() {
  const income = Math.max(0, Number(document.getElementById('monthly-income').value) || 0); const colors = { rent: '#1b4332', food: '#4f8c6b', transport: '#eaa838', savings: '#80b89a', fun: '#e98d75' }; let total = 0; const slices = [];
  document.querySelectorAll('[data-budget]').forEach((input) => { const amount = Math.max(0, Number(input.value)); input.max = String(Math.max(income, amount)); document.getElementById(`builder-${input.dataset.budget}-value`).textContent = money(amount); total += amount; if (income && amount) slices.push(`${colors[input.dataset.budget]} ${(amount / income) * 100}%`); });
  const chart = document.getElementById('budget-pie'); chart.style.background = slices.length ? `conic-gradient(${slices.join(', ')})` : 'conic-gradient(#d3c9b8 0 100%)'; chart.setAttribute('aria-label', `Allocated ${money(total)} from ${money(income)} income`);
  const remaining = income - total; const result = document.getElementById('budget-remaining'); result.textContent = `${remaining >= 0 ? 'Remaining' : 'Over budget'}: ${money(Math.abs(remaining))}`; result.classList.toggle('deficit-text', remaining < 0); document.getElementById('budget-chart-caption').textContent = income ? `${Math.round(total / income * 100)}% allocated` : 'Enter income to plan your budget';
}
document.getElementById('monthly-income').addEventListener('input', updateBudgetBuilder); document.querySelectorAll('[data-budget]').forEach((input) => input.addEventListener('input', updateBudgetBuilder));
function updateGoalPlanner() {
  const goal = Math.max(0, Number(document.getElementById('goal-amount').value) || 0); const monthly = Math.max(0, Number(document.getElementById('goal-monthly').value) || 0); const saved = Math.min(goal, Math.max(0, Number(document.getElementById('goal-saved').value) || 0)); const months = monthly ? Math.ceil(Math.max(0, goal - saved) / monthly) : 0;
  document.getElementById('goal-time').textContent = months ? `${months} ${months === 1 ? 'month' : 'months'}` : 'Add a monthly saving amount';
  document.getElementById('goal-date').textContent = months ? `Saving ${money(monthly)} each month gets you to ${document.getElementById('goal-name').value.trim() || 'your goal'} in about ${months} ${months === 1 ? 'month' : 'months'}.` : 'A monthly amount helps estimate your timeline.';
  const progress = goal ? Math.min(100, saved / goal * 100) : 0; document.getElementById('goal-progress').style.width = `${progress}%`; document.querySelector('[aria-label="Savings goal progress"]').setAttribute('aria-valuenow', String(Math.round(progress)));
}
['goal-name', 'goal-amount', 'goal-monthly', 'goal-saved'].forEach((id) => document.getElementById(id).addEventListener('input', updateGoalPlanner));
function updateInterest() {
  const v = Object.fromEntries(['start', 'monthly', 'rate', 'years'].map((name) => [name, Number(document.querySelector(`[data-interest="${name}"]`).value)]));
  document.getElementById('interest-start-value').textContent = money(v.start); document.getElementById('interest-monthly-value').textContent = money(v.monthly); document.getElementById('interest-rate-value').textContent = `${v.rate}%`; document.getElementById('interest-years-value').textContent = `${v.years} ${v.years === 1 ? 'year' : 'years'}`;
  let balance = v.start; const points = [balance]; for (let month = 1; month <= v.years * 12; month++) { balance = balance * (1 + v.rate / 1200) + v.monthly; if (month % 12 === 0) points.push(balance); }
  document.getElementById('interest-total').textContent = money(balance); const max = Math.max(...points, 1); document.getElementById('growth-line').setAttribute('points', points.map((n, i) => `${12 + i * 336 / Math.max(points.length - 1, 1)},${126 - n / max * 110}`).join(' ')); document.getElementById('growth-chart').setAttribute('aria-label', `Estimated value grows from ${money(points[0])} to ${money(balance)} over ${v.years} years. Estimate only.`);
}
document.querySelectorAll('[data-interest]').forEach((input) => input.addEventListener('input', updateInterest));
function debtPayoff(balance, rate, payment) {
  let months = 0; let interestTotal = 0; const monthlyRate = rate / 1200;
  if (balance <= 0 || payment <= 0) return { months: Infinity, interest: Infinity };
  while (balance > 0 && months < 1200) { const interest = balance * monthlyRate; if (payment <= interest) return { months: Infinity, interest: Infinity }; interestTotal += interest; balance = Math.max(0, balance + interest - payment); months++; }
  return { months: balance <= 0 ? months : Infinity, interest: interestTotal };
}
function updateDebt() {
  const balance = Math.max(0, Number(document.getElementById('debt-balance').value) || 0); const rate = Number(document.getElementById('debt-rate').value); const minimum = Math.max(0, Number(document.getElementById('debt-minimum').value) || 0); const extra = Number(document.getElementById('debt-extra').value);
  document.getElementById('debt-rate-value').textContent = `${rate}%`; document.getElementById('debt-extra-value').textContent = money(extra); const box = document.getElementById('debt-comparison'); box.replaceChildren();
  const results = [ [`Minimum payment (${money(minimum)}/mo)`, debtPayoff(balance, rate, minimum)], [`With extra (${money(minimum + extra)}/mo)`, debtPayoff(balance, rate, minimum + extra)] ];
  results.forEach(([label, res]) => { const row = document.createElement('div'); row.className = 'debt-result-row'; row.append(makeNode('span', label), makeNode('strong', res.months === Infinity ? 'Would not pay off at this amount' : `${Math.floor(res.months / 12)} yr ${res.months % 12} mo · ${money(res.interest)} interest`)); box.append(row); });
  if (results.every(([, res]) => res.months !== Infinity)) { const note = makeNode('p', `The extra payment could clear the balance about ${results[0][1].months - results[1][1].months} months sooner. Estimates only; check actual loan terms.`); box.append(note); }
}
['debt-balance', 'debt-rate', 'debt-minimum', 'debt-extra'].forEach((id) => document.getElementById(id).addEventListener('input', updateDebt));

const sortData = [['School lunch','needs'],['Matatu fare to class','needs'],['Notebook for lessons','needs'],['Basic soap','needs'],['Prescribed medicine','needs'],['A safe place to sleep','needs'],['Premium phone case','wants'],['Extra game credits','wants'],['Second treat after lunch','wants'],['Latest fashion accessory','wants'],['Streaming add-on','wants'],['Decorative room lights','wants']];
let sortChoice = null; let sortPoints = 0; const sortList = document.getElementById('sorting-items');
function resetSorting() {
  sortChoice = null; sortPoints = 0; sortList.replaceChildren();
  sortData.forEach(([label, category], index) => { const button = makeNode('button', label); button.type = 'button'; button.className = 'sort-item'; button.draggable = true; button.dataset.category = category;
    button.addEventListener('click', () => { if (button.dataset.sorted) return; sortList.querySelectorAll('.selected').forEach((node) => node.classList.remove('selected')); sortChoice = button; button.classList.add('selected'); document.getElementById('sort-feedback').textContent = `Selected “${label}”. Choose Needs or Wants.`; });
    button.addEventListener('dragstart', (event) => { sortChoice = button; event.dataTransfer.setData('text/plain', String(index)); }); sortList.append(button);
  }); document.getElementById('sort-feedback').textContent = 'Sorted: 0 / 12 · Score: 0';
}
function sortInto(bucket) {
  if (!sortChoice || sortChoice.dataset.sorted) return; const correct = sortChoice.dataset.category === bucket; sortPoints += Number(correct); sortChoice.dataset.sorted = 'true'; sortChoice.disabled = true; sortChoice.classList.remove('selected'); sortChoice.classList.add(correct ? 'sort-correct' : 'sort-incorrect'); const done = sortList.querySelectorAll('[data-sorted="true"]').length;
  document.getElementById('sort-feedback').textContent = done === sortData.length ? `Game complete! Score ${sortPoints} / ${sortData.length}. Needs can depend on someone’s situation.` : `${correct ? 'Correct!' : `Not quite—this is a ${sortChoice.dataset.category.slice(0,-1)}.`} Sorted: ${done} / 12 · Score: ${sortPoints}`; sortChoice = null;
  if (done === sortData.length) { const play = makeNode('button', 'Play again'); play.type = 'button'; play.className = 'button button-secondary'; play.addEventListener('click', resetSorting); document.getElementById('sort-feedback').after(play); }
}
document.querySelectorAll('[data-sort-bucket]').forEach((bucket) => { bucket.addEventListener('click', () => sortInto(bucket.dataset.sortBucket)); bucket.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); sortInto(bucket.dataset.sortBucket); } }); bucket.addEventListener('dragover', (event) => event.preventDefault()); bucket.addEventListener('drop', (event) => { event.preventDefault(); sortInto(bucket.dataset.sortBucket); }); }); resetSorting();

const scamCases = [['Text message','You won KSh 50,000! Pay a KSh 500 fee now to release your prize.','scam','Unexpected prize plus an upfront fee is a warning sign.'],['Account alert','Your bank will never ask for your PIN by SMS. Check alerts inside the official app.','safe','This warns you not to share a PIN; verify in the official app.'],['WhatsApp','I am your cousin. Send me your one-time code urgently so I can fix your account.','scam','Never share a one-time code. Call them another way.'],['Email','A delivery is waiting. Click this shortened link and enter card details to release it.','scam','Verify unexpected links independently; never enter payment details from a suspicious message.'],['School notice','School office: tomorrow’s book list is on the noticeboard. Ask your teacher for a copy.','safe','A normal notice asks for no money or private information.']];
let scamStep = 0; let scamHits = 0;
function showScamCase() { if (scamStep >= scamCases.length) return; document.getElementById('scam-game-channel').textContent = scamCases[scamStep][0]; document.getElementById('scam-game-text').textContent = scamCases[scamStep][1]; document.getElementById('scam-game-feedback').textContent = ''; document.getElementById('scam-game-score').textContent = `${scamStep} / 5 · ${scamHits} correct`; }
document.querySelectorAll('[data-scam-game]').forEach((button) => button.addEventListener('click', () => { if (scamStep >= scamCases.length) return; const entry = scamCases[scamStep]; const right = button.dataset.scamGame === entry[2]; if (right) scamHits++; document.getElementById('scam-game-feedback').textContent = `${right ? 'Correct.' : 'Not quite.'} ${entry[3]}`; scamStep++; document.getElementById('scam-game-score').textContent = `${scamStep} / 5 · ${scamHits} correct`; if (scamStep === scamCases.length) { document.getElementById('scam-game-text').textContent = `All messages reviewed. Final score: ${scamHits} / 5.`; document.querySelectorAll('[data-scam-game]').forEach((item) => { item.disabled = true; }); } else window.setTimeout(showScamCase, 1000); })); showScamCase();

const stories = [
  { text: 'You receive KSh 1,000 for the week. School transport and lunch cost KSh 700. What next?', answers: [['Save KSh 100 and keep KSh 200 as a buffer',0,'A buffer can help with small surprises, and saving builds a habit.'],['Spend the remaining KSh 300 today',-300,'That leaves no buffer for the rest of the week.'],['Borrow KSh 500 for extra treats',-100,'Borrowing for wants adds a future repayment.']] },
  { text: 'A classmate sends a link promising free data if you enter your mobile money PIN. What will you do?', answers: [['Do not open it; verify with the provider',0,'Good call. Never share a PIN; check offers through official channels.'],['Enter your PIN quickly',-250,'Sharing a PIN can put your money at risk.'],['Forward the link to classmates',-100,'Forwarding an unverified link can put others at risk.']] },
  { text: 'Your savings goal is close, but a friend invites you to spend KSh 200. What could you do?', answers: [['Check your plan and choose an amount that fits',0,'You can enjoy time with friends while protecting your goal.'],['Spend your whole savings goal',-200,'A pause could help keep the savings plan on track.'],['Take a high-cost loan for the outing',-300,'Borrowing for a want can make the outing cost more.']] }
];
let storyIndex = 0; let practiceCash = 1000;
function renderStory() {
  const complete = storyIndex >= stories.length; document.getElementById('money-choice-step').textContent = complete ? 'Scenarios complete' : `Scenario ${storyIndex + 1} of ${stories.length}`; document.getElementById('money-choice-story').textContent = complete ? 'You have practiced three everyday money decisions. Play again to explore other choices.' : stories[storyIndex].text; document.getElementById('money-choice-balance').textContent = money(practiceCash);
  const options = document.getElementById('money-choice-options'); options.replaceChildren();
  if (!complete) stories[storyIndex].answers.forEach(([label, change, explain]) => { const button = makeNode('button', label); button.className = 'choice-button'; button.type = 'button'; button.addEventListener('click', () => { practiceCash = Math.max(0, practiceCash + change); storyIndex++; document.getElementById('money-choice-feedback').textContent = explain; renderStory(); }); options.append(button); });
  else { const restart = makeNode('button', 'Play again'); restart.type = 'button'; restart.className = 'button button-secondary'; restart.addEventListener('click', () => { storyIndex = 0; practiceCash = 1000; document.getElementById('money-choice-feedback').textContent = ''; renderStory(); }); options.append(restart); }
}
renderStory();

const cards = [['Budget','A plan for how to use income for needs, savings, and wants.'],['Interest','Money earned on savings or paid for borrowing.'],['Credit score','A measure some lenders use to assess credit history; methods vary.'],['Inflation','A general rise in prices that changes what money can buy.'],['Emergency fund','Money kept for unexpected necessary expenses.'],['Diversification','Spreading investments instead of relying on only one.'],['Debt','Money borrowed that still needs to be repaid, often with costs.'],['Scam','A dishonest trick designed to get money or private information.']];
let cardIndex = 0; let cardFlipped = false; const visitedCards = new Set();
function showCard() { const [term, description] = cards[cardIndex]; document.getElementById('flashcard-term').textContent = cardFlipped ? description : term; document.getElementById('flashcard-hint').textContent = cardFlipped ? 'Tap to see the term' : 'Tap to reveal the meaning'; document.getElementById('flashcard-count').textContent = `${cardIndex + 1} / ${cards.length}`; document.getElementById('flashcard').setAttribute('aria-label', cardFlipped ? `${term}: ${description}. Tap to hide meaning.` : `${term}. Tap to reveal meaning.`); visitedCards.add(cardIndex); }
document.getElementById('flashcard').addEventListener('click', () => { cardFlipped = !cardFlipped; showCard(); }); document.getElementById('flashcard-next').addEventListener('click', () => { cardIndex = (cardIndex + 1) % cards.length; cardFlipped = false; showCard(); }); document.getElementById('flashcard-back').addEventListener('click', () => { cardIndex = (cardIndex - 1 + cards.length) % cards.length; cardFlipped = false; showCard(); }); showCard();

const glossary = [['Budget','A plan for income, spending, and saving over time.'],['Compound interest','Interest calculated on the original amount and on interest already added.'],['Credit','An agreement to borrow money or use a service and repay later.'],['Credit score','A number some lenders use to assess credit history; methods vary.'],['Debt','Money borrowed that is still owed.'],['Diversification','Spreading investments across different assets to reduce reliance on one.'],['Emergency fund','Savings kept for unexpected necessary expenses.'],['Inflation','A general increase in prices over time.'],['Interest','The cost of borrowing or the return earned on savings.'],['Investment','An asset bought with the hope it may grow, with a risk of loss.'],['Minimum payment','The smallest scheduled amount due on debt for a billing period.'],['Needs','Essentials for health, safety, learning, or daily life.'],['Savings goal','An amount you plan to set aside for a reason and timeline.'],['Scam','A deceptive attempt to get money or private information.'],['Wants','Optional things that can improve enjoyment but are not essential now.']];
function showGlossary(query = '') { const target = document.getElementById('glossary-results'); target.replaceChildren(); const q = query.trim().toLocaleLowerCase(); const found = glossary.filter(([term, meaning]) => `${term} ${meaning}`.toLocaleLowerCase().includes(q)); if (!found.length) { target.append(makeNode('p', 'No matching terms. Try a different search.')); return; } found.forEach(([term, meaning]) => { const article = document.createElement('article'); article.className = 'glossary-term'; article.append(makeNode('h3', term), makeNode('p', meaning)); target.append(article); }); }
document.getElementById('glossary-search').addEventListener('input', (event) => showGlossary(event.target.value)); showGlossary();

document.getElementById('reset-progress').addEventListener('click', () => {
  if (!window.confirm('Reset your lesson results, XP, badges, and streak on this device? This cannot be undone.')) return;
  progressState = { lessons: {}, quizScores: {}, activities: [], xp: 0, streak: 0, lastVisit: null, badges: [] }; saveProgress(); renderDashboard(); renderLessonList();
  document.querySelectorAll('.mark-activity').forEach((button) => { button.disabled = false; button.textContent = 'Finish activity'; });
});
updateBudgetBuilder(); updateGoalPlanner(); updateInterest(); updateDebt(); refreshCurrencyLabels(); renderDashboard();
