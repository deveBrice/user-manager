import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DistrictService } from 'src/shared-global/service/district.service';
import { IDistrict } from './shared/interface/IDistrict.interface';
import { map } from 'rxjs/operators';
import {Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'user-manager';
  usersForm: FormGroup;
  districtList$: Observable<IDistrict[]> = of([])

  constructor(private fb: FormBuilder, private districtService: DistrictService){}

  ngOnInit(): void {
     this.displayUsersForm();  
     this.onDistrict();
  }

  displayUsersForm = (): void => {
    this.usersForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: [''],
      region: ['', Validators.required]
    })
  }

  onDistrict = () => {
   this.districtList$ = this.districtService.getRegion()
     .pipe(map((res) => {
       return res
     }))


     this.districtList$.subscribe((res: IDistrict[]) => {
       res.find((r) => {
         if(r.nom === "Guadeloupe") {
           this.usersForm.patchValue({
             region: r.nom
           })
         }
       })
     })
  }

  AddUser = () => {
    if(this.usersForm.valid) {
      console.log('user add')
    }
  }

}
