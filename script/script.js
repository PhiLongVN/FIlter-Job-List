const linkjob = './data.json';
const listJob = document.querySelector('.list-job');

/* ============================================ */
/*                  LOAD JOB RA                 */
/* ============================================ */
// fetch
function fetchjob() {
  fetch(linkjob)
    .then((res) => res.json())
    .then((data) => {
      loadJob(data);
    });
}

// loadjob
function loadJob(data) {
  let jobBlock = [];

  data.forEach((element) => {
    jobBlock += `<div class="job-block">
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
  });
  listJob.innerHTML = jobBlock;
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

fetchjob();

/* ============================================ */
/*           KHI BAM VAO THANH SEARCH           */
/* ============================================ */

const clear = document.querySelector('.clear');
const search = document.querySelector('.title-search');
const searchBar = document.querySelector('.search-job');

clear.addEventListener('click', clearHandle);

function clearHandle() {
  search.innerHTML = '';
  array = [];
}

listJob.addEventListener('click', handleFeature);

let array = [];

function handleFeature(e) {
  let event = e.target;
  let value;
  let block = [];

  if (event.classList.contains('feature')) {
    value = event.innerHTML;

    if (!array.includes(value)) {
      array.push(value);

      array.forEach((key) => {
        block += `<div class="title-detail">${key}<span>x</span></div>`;
      });

      search.innerHTML = block;

      handleFilter()
    }
  }
}

search.addEventListener('click', handleDelete);

function handleDelete(e) {
  let targetClick = e.target;

  if (targetClick.innerText == 'x') {
    targetClick.parentNode.remove();

    let a = targetClick.parentNode.innerText;

    if (a.includes('x')) {
      a = a.replace('x', '');
      let index = array.indexOf(a);
      array.splice(index, 1);
    }
  }
}


function handleFilter() {
   
 
     
    
   
}