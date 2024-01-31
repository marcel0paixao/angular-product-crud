// import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { MyApiService } from 'caminho-do-seu-servico';

// export function emailExistsValidator(myApiService: MyApiService): AsyncValidatorFn {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     const email = control.value;

//     if (!email) {
//       return of(null); // Se o campo estiver vazio, considere como válido
//     }

//     return myApiService.checkEmailExists(email).pipe(
//       map(exists => (exists ? { emailExists: true } : null)),
//       catchError(() => of(null))
//     );
//   };
// }
