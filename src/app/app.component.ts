import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DistrictService } from 'src/shared-global/service/district.service';
import { IDistrict } from './shared/interface/IDistrict.interface';
import { IUsers } from './shared/interface/IUsers.interface';
import {combineLatest, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'user-manager';
  usersForm: FormGroup;
  filterUser: FormControl;
  districtList$: Observable<IDistrict[]> = of([])
  valuesFiedsResult: any = {};
  currentUserForm: any = {};
  newUser = []
  usersStorageResult$: Observable<any> = of([])
  displayUsers$: Observable<any[]> = of(JSON.parse(localStorage.getItem('users')));
  usersStorageResult: any[] = [];
  filtring = ""

  constructor(private fb: FormBuilder, private districtService: DistrictService){}

  ngOnInit(): void {
     this.displayUsersForm();  
     this.onDistrict();
     this.changeInputForm();
     this.initStorage()
     this.displayUsersTable()
  }

  

  displayUsersForm = (): void => {
    this.usersForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['',  [Validators.minLength(10)]],
      region: ['', Validators.required]
    })
   
  }


  onDistrict = () => {
    this.districtList$ = this.districtService.getRegion();
  
     this.districtList$.subscribe((res: IDistrict[]): void => {
       res.find((r) => {
         if(r.nom === "Guadeloupe") {
           this.usersForm.patchValue({
             region: r.nom
           })
         }
       })
     })
  }

  changeInputForm = (): void => {
    this.usersForm.valueChanges.subscribe((res) => {
      this.valuesFiedsResult = res;
    })
  }

  AddUser = (): void => {

    if(this.usersForm.valid) {
      const usersIdentity = {
        ...this.currentUserForm,
        ...this.valuesFiedsResult
      }
      this.usersStorage(usersIdentity)
    }
  }

  initStorage = () => {
    const storageUsers = JSON.parse(localStorage.getItem('users'))
     if(storageUsers === null) {
      localStorage.setItem('users', JSON.stringify([]));
     }
  }

  usersStorage = (usersIdentity: IUsers) => {
    const newUser = this.checkUsersExist(usersIdentity, this.usersStorageResult$)
    const newUserResult = this.filterByName(newUser)
    localStorage.setItem('users', JSON.stringify(newUserResult));
   
    this.usersStorageResult$ = of(JSON.parse(localStorage.getItem('users')));
    this.usersForm.reset();
    this.displayUsers$ = this.usersStorageResult$
  }

  checkUsersExist = (usersIdentity: IUsers, usersStorageResult$: Observable<IUsers[]>): IUsers[] => {
    usersStorageResult$.subscribe(usr => {
      const checkName = usr.map((res) => res.nom).indexOf(usersIdentity.nom)
      const checkFirstName = usr.map((res) => res.prenom).indexOf(usersIdentity.prenom)
      const checkPhone = usr.map((res) => res.telephone).indexOf(usersIdentity.telephone)
      const storageUsers = JSON.parse(localStorage.getItem('users'))
       console.log(storageUsers)
      if(storageUsers === null) {
        
        if(checkName === -1 && checkFirstName === -1 && checkPhone === -1) {
          this.newUser.push(usersIdentity)
          console.log(usersIdentity)
        }
      } else {
        storageUsers.push(usersIdentity);
         this.newUser = storageUsers
      }
    })
    return this.newUser;
  }

 

  filterByName = (newUser: IUsers[]): IUsers[] => {
    
    newUser.sort(function(a, b) {
      console.log(a)
      return a.nom.localeCompare(b.nom)
    })
    return newUser
  }

  displayUsersTable = () => {
    
    this.filterUser = new FormControl('');

    const filterUser$ = this.filterUser.valueChanges.pipe(startWith(''))

    this.displayUsers$ = combineLatest(this.displayUsers$, filterUser$).pipe(
      map(([displayUsers, filterUser]) => displayUsers.filter((du: IUsers) => {
        this.filtring = filterUser      
           return this.isMatch(du)
         })
      )
    )

  }


  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => {
        return this.isMatch(item[k])
      });
    } else {
      if(item !== null) {
        return item.toString().indexOf(this.filtring) > -1
      }
      
    }
  }

  deleteUser = (index: number, displayUsers$: Observable<IUsers[]>): void => {
    displayUsers$.subscribe((res: IUsers[]) => {
     res.splice(index, 1)
    })
   }

}
