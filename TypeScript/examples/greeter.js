var User = /** @class */ (function() {
  function User(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = firstName + " " + lastName;
  }
  return User;
})();
function greeter(person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new User("Jane", "User");
// document.body.innerHTML = greeter(user);
console.log(greeter(user));
