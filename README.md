# Public API Requests Project

This web based app is for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other. The app uses the Random User Generator API ([https://randomuser.me/](https://randomuser.me/)) to grab information for 12 random &ldquo;employees&rdquo;, and use that data to build a prototype for an Awesome Startup employee directory. The returned JSON data is parsed so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee&rsquo;s image or name will open a modal window with more detailed information, such as the employee&rsquo;s birthday and address.

Live Preview: https://danpoynor.github.io/public-api-request-example-project/

---

## Code Validation

[W3C HTML Validation ](https://validator.w3.org/nu/?doc=https%3A%2F%2Fdanpoynor.github.io%2Fpublic-api-request-example-project%2F)<br>
[W3C CSS Validation](http://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fdanpoynor.github.io%2Fpublic-api-request-example-project%2Fcss%2Fstyles.css&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

---

## Features Include

- Random employee data pulled from the Random User Generator API
- 12 employees displayed in a flex format
- Real-time search to filter employees name
- 'No results' message shown when no employees match the search
- Modal dialog with more detailed information
- Modal dialog carousel with circular Previous/Next navigation
- Responsive mobile-first design

---

## Style Changes Made

- Colors updated including background, font colors, and button colors.
- Card box shadows added to default view and updated rollover state
- CSS custom properties updated

---

## Code Organization

<details>
<summary>expand/collapse</summary>

```javascript
Employee{}  /* class template used for creating employee objects */

/* Modal dialog feature */
getEmployee(email) // helper function gets a single employees data from `window.employees[]`
modalUpdate(employee) // updates the modal dialog with the employee's data */
modalCarousel(direction) // calls `modalUpdate(employee)` based on the `direction`
modalListeners() // adds listeners to the modal, calls `modalCarousel(direction)`
modalCreate(employee) // creates a modal dialog then calls `modalListeners()`

/* Card feature */
cardListener() // adds listeners to the cards, calls `modalCreate(getEmployee(email))`
cardCreate(employee) // creates a card for an employee

/* Search feature */
searchNoResultsMessage() // shows a message if no employees are shown
searchFilter(searchInput) // filters employees based on the search input, calls `searchNoResultsMessage()`
searchListener() // adds 'keyup' and 'input' listeners to search input, calls `searchFilter(searchInput)`
searchCreate() // creates a search input then calls `searchListener()`

/* Employees feature */
employeesGet() // gets employees from API, calls `Employee{}` for each, populates `window.employees[]`
employeesShow() // calls `cardCreate(employee)` for each employee then `cardListener()` when done

/* Initialization */
employeesGet().then(() => {
  employeesShow();
  searchCreate();
});
```

</details>

--- 

## Technologies Used

- HTML
- CSS
- JavaScript
- Random User Generator API

---

## Potential Improvements

- When only one search result and modal is presented, don't include the carousel navigation
