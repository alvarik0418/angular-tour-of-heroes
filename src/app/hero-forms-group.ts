import { FormControl, FormGroup, Validators } from "@angular/forms";

export class HeroFormsGroup{
    public heroFormsGroup =new FormGroup({
        name: new FormControl(
            '', 
            [Validators.required, 
             Validators.minLength(3), 
             Validators.maxLength(50),
            ]),
          alias: new FormControl(
            '', [Validators.required, 
            Validators.minLength(3), 
            Validators.maxLength(50),
           ]),
          power: new FormControl(-1, Validators.required),
        })
}
