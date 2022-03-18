// fetchjob: fetch API
// createJob(), loadJob(), createnew(), createRequest(), createBorder(): tao blockJob cho tung thang
// clearJob, DeleteJob(): delete may Job
// HandleFIlter, CheckJob(): loc ra job khi cho

const linkjob = './data.json';
const listJob = document.querySelector('.list-job');

/* ============================================ */
/*                  LOAD JOB RA                 */
/* ============================================ */
// fetch
async function fetchjob() {
  const res = await fetch(linkjob);
  const data = await res.json();

  return data;
}

// createJob(element)
function createJob(element) {
  return `<div class="${createBorder(element)}">
  <div class="img">
    <img src="${element.logo}" alt="" />
  </div>

  <div class="detail">
    <div class="detail-name">
      <span class="name">${element.company}</span>
      ${createnew(element)}
    </div>

    <div class="detail-company">${element.position}</div>
    <div class="detail-time">
      <span>${element.postedAt}</span>
      <span>${element.contract}</span>
      <span>${element.location}</span>
    </div>
  </div>

  <div class="detail-request">
  <span class="feature">${element.role}</span>
  <span  class="feature">${element.level}</span>
  ${createrequest(element)}
  </div>
</div>`;
}

// loadjob
function loadJob() {
  let blockJob = [];

  fetchjob().then((data) => {
    data.forEach((element) => {
      blockJob += createJob(element);

      // console.log(blockJob);
      listJob.innerHTML = blockJob;
    });
  });
}
loadJob();

// createBorder(data)
function createBorder(data) {
  let border;
  if (data.featured) {
    border = `job-block job-new`;
  } else {
    border = `job-block`;
  }

  return border;
}

// createnew(data)
function createnew(data) {
  let newblock = [];

  if (data.new) {
    newblock += `<span class="new">New!</span>
    `;
  }
  if (data.featured) {
    newblock += `<span class="feature">Featured</span>`;
  }

  return newblock;
}
// createrequest(data)
function createrequest(data) {
  let jobBLock = [];
  data.languages.forEach((key) => {
    jobBLock += `<span class="feature">${key}</span>`;
  });
  data.tools.forEach((key) => {
    jobBLock += `<span class="feature">${key}</span>`;
  });

  return jobBLock;
}

/* ============================================ */
/*           KHI BAM VAO THANH SEARCH           */
/* ============================================ */

const clear = document.querySelector('.clear');
const search = document.querySelector('.title-search');
const searchBar = document.querySelector('.search-job');

clear.addEventListener('click', clearHandle);

// clearHandle()
function clearHandle() {
  search.innerHTML = '';
  array = [];
  searchBar.style.visibility = 'hidden';

  handleFilter();
}

listJob.addEventListener('click', handleFeature);

let array = [];

// handleFeature(e)
function handleFeature(e) {
  let event = e.target;
  let value;
  let block = [];

  if (event.classList.contains('feature')) {
    value = event.innerHTML;
    searchBar.style.visibility = 'visible';

    if (!array.includes(value)) {
      array.push(value);

      array.forEach((key) => {
        block += `<div class="title-detail">${key}<span>x</span></div>`;
      });

      search.innerHTML = block;

      handleFilter();
    }
  }
}

search.addEventListener('click', handleDelete);

// handleDelete(e)
function handleDelete(e) {
  let targetClick = e.target;

  if (targetClick.innerText == 'x') {
    targetClick.parentNode.remove();

    let a = targetClick.parentNode.innerText;

    if (a.includes('x')) {
      a = a.replace('x', '');
      let index = array.indexOf(a);
      array.splice(index, 1);
      handleFilter();
    }
    if (array.length == 0) {
      searchBar.style.visibility = 'hidden';
    }
  }
}

// handleFilter()
function handleFilter() {
  let blockJob = [];

  fetchjob().then((data) => {
    data.forEach((element) => {
      if (checkJob(element)) {
        blockJob += createJob(element);

        listJob.innerHTML = blockJob;
      }
    });
  });
}

// checkJob(element)
function checkJob(element) {
  let isValid = true;
  array.forEach((elem) => {
    if (
      !element.languages.includes(elem) &&
      !element.tools.includes(elem) &&
      element.role !== elem &&
      element.level !== elem
    ) {
      isValid = false;
    }
  });
  return isValid;
}
