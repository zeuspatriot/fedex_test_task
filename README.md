# FedexTestTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Room for improvement

- E2e is not implemented due to time constraints, but as an improvement, at least a "Happy flow" should be implemented to capture successfull execution of business logic.
- Form validation for Password and Confirm password are dynamic, they trigger at change of any field to validate Password imeddiately if user change his First or Last name. As it is great for showcasing posibility of dynamic validation, it is really bad case for accessability as new elements are shown when they are not expected. It is better to validate on submit only to adhere to accessability reccomendations.
- Project structure is very flat at the moment, as we dont have too many pages. For more established and complex project, it makes sense to group components and pages they are used at closer togather.
- RxJs is not showcased that much, but it was not called for as well. It is possible to use it with form.valueChanges and implement dynamic validation there. RxJs is very powerfull tool, but it is also complex, so if anyone on the team is not great with RxJs, it is safer to default to some more regular approaches.
- For more developed product, translations are a must, but for the test task it should be ok to proceed with hardcoded strings.
- With growing amount of components, it makes sense to orgonise 'Shared' module to easily import common modules. With just few components present, I opted out to import necessary modules directly.
