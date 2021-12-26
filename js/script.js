/**
 * @author Dan Poynor <danpoynor.com>
 */

/**
 * Create a global variable to hold the employees data
 * @global {Array} employees - The array of employees fetched from randomuser.me API
 * @example employees
 * @returns {Array}
 */
window.employees = [];

/**
 * This is a description of the Employee constructor function.
 * @class
 * @classdesc This is a description of the Employee class.
 */
class Employee {
  /**
   * @param {Object} employee - The employee data object.
   */
  constructor(employee) {
    /**
     * @property {string} firstName - The employee's first name.
     * @property {string} lastName - The employee's last name.
     * @property {string} email - The employee's email.
     * @property {string} cell - The employee's cell phone number.
     * @property {string} image - The employee's image.
     * @property {string} city - The employee's city.
     * @property {string} address - The employee's address.
     * @property {string} birthday - The employee's birth date.
     */
    this.firstName = employee.name.first;
    this.lastName = employee.name.last;
    this.email = employee.email;
    this.cell = employee.cell;
    this.image = employee.picture.large;
    this.city = employee.location.city;
    this.address = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}`;
    this.birthday = employee.dob.date;
  }

  /**
   * @get fullName
   * @desc Returns the full name of the employee
   * @example Employee.fullName // 'John Doe'
   * @returns {string}
   */
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * @get formattedCell
   * @desc If cell number is 10 digits it's reformatted as (###) ###-####
   * @example Employee.formattedCell // '(123) 123-1234'
   * @returns {string}
   */
  get formattedCell() {
    const cellDigits = this.cell.replace(/\D/g, '');
    if (cellDigits.length === 10) {
      return cellDigits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else {
      return this.cell;
    }
  }

  /**
   * @get formattedBirthday
   * @desc Formats the birthday as MM/DD/YYYY
   * @example Employee.formattedBirthday // '01/01/1970'
   * @returns {string}
   */
  get formattedBirthday() {
    const birthDate = new Date(this.birthday);
    return `${birthDate.getMonth() + 1}/${birthDate.getDate()}/${birthDate.getFullYear()}`;
  }
}

/**
 * Get data for an employee
 * @function getEmployee
 * @desc Gets data for an employee based on their email address
 * @param {string} email - The email address of the employee to get
 * @example getEmployee('johndoe@email.com')
 * @returns {Object} - The employee object
 */
const getEmployee = email => {
  return window.employees.find(employee => employee.email === email);
};

/**
 * Update the modal with another employees information
 * @function modalUpdate
 * @desc Updates the modal with the next or previous employee
 * @param {Object} employee - The employee object
 */
const modalUpdate = employee => {
  document.querySelector('.modal-name').textContent = employee.fullName;
  document.querySelector('.modal-img').src = employee.image;
  document.querySelectorAll('.modal-text')[0].textContent = employee.email;
  document.querySelectorAll('.modal-text')[1].textContent = employee.city;
  document.querySelectorAll('.modal-text')[2].textContent = employee.formattedCell;
  document.querySelectorAll('.modal-text')[3].textContent = employee.address;
  document.querySelectorAll('.modal-text')[4].textContent = `Birthday: ${employee.formattedBirthday}`;
};

/**
 * Show prev/next employee when clicking on the buttons
 * @function modalCarousel
 * @param {number} direction - The direction to move the carousel
 * @example modalCarousel(1) - move to the next employee
 * @example modalCarousel(-1) - move to the previous employee
 * @returns {void}
 */
const modalCarousel = direction => {
  // Get the active card for the employee currently shown in the modal
  const currentEmployee = document.querySelector('.card.active');

  // In case user performed a search before clicking on the next/prev button,
  // get a list of employee cards currently shown on the page
  const cardsNotHidden = document.querySelectorAll('.card:not([hidden])');

  // Get the index of the active card within the list of shown employee cards
  const currentIndex = [...cardsNotHidden].indexOf(currentEmployee);

  // Get index of employee to show based on currentIndex and direction
  let indexToShow = currentIndex + direction;

  // Cycle to beginning or end of card list if index is out of bounds
  if (indexToShow < 0) {
    indexToShow = cardsNotHidden.length - 1;
  } else if (indexToShow > cardsNotHidden.length - 1) {
    indexToShow = 0;
  }

  // Get index of employee to show based on currentIndex plus direction
  const employeeToShow = cardsNotHidden[indexToShow];

  // Get the email of the employee to show
  const email = employeeToShow.querySelector('.card-text:nth-of-type(1)').textContent;

  // Update the modal with the employee to show based on the email
  modalUpdate(getEmployee(email));

  // Swap the .active class from the current employee to the employee to show
  currentEmployee.classList.remove('active');
  employeeToShow.classList.add('active');
};

/**
 * Function to add listeners to buttons in the modal dialog
 * @function modalListeners
 * @desc Shows the modal for an employee
 * @example modalListeners(employeename@domain.com)
 * @returns {void}
 */
const modalListeners = () => {
  const modalContainer = document.querySelector('.modal-container');
  const closeBtn = document.getElementById('modal-close');
  const nextBtn = document.getElementById('modal-next');
  const prevBtn = document.getElementById('modal-prev');

  closeBtn.addEventListener('click', () => {
    document.querySelector('.active').classList.remove('active');
    modalContainer.remove();
  });

  nextBtn.addEventListener('click', () => {
    // Add 1 to the index of which employee to show
    modalCarousel(1);
  });

  prevBtn.addEventListener('click', () => {
    // Subtracts 1 from the index of which employee to show
    modalCarousel(-1);
  });
};

/**
 * Create a modal dialog for an employee
 * @function modalCreate
 * @desc Creates a modal dialog for an employee
 * @param {Object} employee - The employee object
 * @example modalCreate(employee)
 * @returns {HTMLElement}
 */
const modalCreate = employee => {
  const modal = document.createElement('div');
  modal.classList.add('modal-container');
  modal.innerHTML = `
    <div class="modal">
      <button type="button" id="modal-close" class="modal-close-btn"><strong>+</strong></button>
      <div class="modal-info-container">
        <img src="${employee.image}" alt="${employee.fullName}" class="modal-img">
        <h3 class="modal-name cap">${employee.fullName}</h3>
        <p class="modal-text">${employee.email}</p>
        <p class="modal-text cap">${employee.city}</p>
        <hr>
        <p class="modal-text">${employee.formattedCell}</p>
        <p class="modal-text">${employee.address}</p>
        <p class="modal-text">Birthday: ${employee.formattedBirthday}</p>
      </div>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
  `;
  document.body.insertAdjacentElement('beforeend', modal);
  modalListeners();
};

/**
 * Function to listen for clicks on employee cards and show a modal for an employee
 * @function cardListener
 * @desc Shows a modal for an employee when their card is clicked and add an .active class to the clicked card
 * @example cardListener()
 */
const cardListener = () => {
  document.addEventListener('click', ev => {
    let target = ev.target;
    let email = '';

    // If the target or any of its parents is a card,
    // - get the email address of the employee, then
    // - show modal for the employee with that email
    // Note email address is used as a unique identifier
    if (target.classList.contains('card')) {
      email = target.querySelector('.card-text:nth-of-type(1)').textContent;
    } else if (target.closest('.card')) {
      target = target.closest('.card');
      email = target.querySelector('.card-text:nth-of-type(1)').textContent;
    }

    // Make click was on a card with an email address and add the .active class to the clicked card
    if (email) {
      modalCreate(getEmployee(email));
      target.classList.add('active');
    }
  });
};

/**
 * Function to assemble the HTML for an employee card
 * @function cardCreate
 * @desc Creates the HTML for an employee card
 * @param {Object} employee - The employee object
 * @returns object
 */
const cardCreate = employee => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-image-container">
      <img src="${employee.image}" alt="${employee.fullName}" class="card-img">
    </div>
    <div class="card-info-container">
      <h3 class="card-name cap">${employee.fullName}</h3>
      <p class="card-text">${employee.email}</p>
      <p class="card-text cap">${employee.formattedCell}</p>
      <p class="card-text cap">${employee.city}</p>
    </div>
  `;
  return card;
};

/**
 * Function to add or remove the no results message
 * @function searchNoResultsMessage
 * @desc Adds or removes the no results message
 * @example searchNoResultsMessage()
 * @returns {void}
 */
const searchNoResultsMessage = () => {
  const employeeList = window.gallery;
  const cardCount = employeeList.querySelectorAll('.card:not([hidden])').length;

  if (cardCount === 0) {
    const noResults = document.createElement('p');
    noResults.id = 'no-results';
    noResults.textContent = 'No results found';
    employeeList.insertAdjacentElement('beforeend', noResults);
  }
};

/**
 * Function to filter the employee cards based on the search input
 * @function searchFilter
 * @desc Filters the employee cards based on the search input
 * @example searchFilter()

 */
const searchFilter = searchInput => {
  const searchValue = searchInput.value.toLowerCase();
  const employeeCards = document.querySelectorAll('.card');

  // Remove the no results message if it exists
  document.getElementById('no-results')?.remove();

  // Loop through the cards and hide the ones that don't match the search value
  employeeCards.forEach(card => {
    const name = card.querySelector('.card-name').textContent.toLowerCase();
    card.hidden = name.indexOf(searchValue) <= -1;
  });

  // Check if no results message should be shown
  searchNoResultsMessage();
};

/**
 * Function to add functionality to the search field
 * @function searchListener
 * @desc Adds functionality to the search field
 * @example searchListener()
 * @returns {void}
 */
const searchListener = () => {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', () => { searchFilter(searchInput); });
  searchInput.addEventListener('input', () => { searchFilter(searchInput); });
};

/**
 * Function to insert the search form into the DOM
 * @function searchCreate
 * @desc Inserts the search form into the DOM
 * @example searchCreate()
 * @returns {void}
 */
const searchCreate = () => {
  const searchContainer = document.querySelector('.search-container');
  searchContainer.insertAdjacentHTML('beforeend', `
    <form action="#" method="get" id="search-form">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>
  `);
  searchListener();
};

/**
 * Function to get data for 12 employees from the API and save it to the global employees array
 * @function employeesGet
 * @desc Gets the employees from the API and populates the global employees array
 * @example employeesGet()
 * @returns {Promise}
 */
const employeesGet = () => {
  return new Promise((resolve, reject) => {
    fetch('https://randomuser.me/api/?results=12&nat=us,ca,au')
      .then(response => {
        if (response.status !== 200) {
          console.error(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }
        response.json().then(data => {
          // Loop through the data and create an employee for each user
          data.results.forEach(employee => {
            window.employees.push(new Employee(employee));
          });
          resolve();
        });
      })
      .catch(error => {
        console.error('Fetch Error :-S', error);
        reject(error);
      });
  });
};

/**
 * Function to insert each employee card into the DOM
 * @function employeesShow
 * @desc Inserts each employee card into the DOM
 * @example employeesShow()
 * @returns {void}
 */
const employeesShow = () => {
  const employeeList = window.gallery;
  window.employees.forEach(employee => {
    const employeeCard = cardCreate(employee);
    employeeList.insertAdjacentElement('beforeend', employeeCard);
  });
  cardListener();
};

/**
 * Function to display the employee data
 * @function displayEmployees
 * @desc Displays the employees in the DOM
 * @example displayEmployees()
 * @returns {void}
 */
employeesGet().then(() => {
  employeesShow();
  searchCreate();
});
