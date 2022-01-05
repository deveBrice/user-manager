import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IDistrict } from "src/app/shared/interface/IDistrict.interface";

@Injectable({
    providedIn: 'root'
})

export class DistrictService {
   private readonly REGION_API_URL = 'https://geo.api.gouv.fr/regions';
   regions = of([
    {nom: 'Guadeloupe', code: '971'},
    {nom: 'Martinique', code: '972'},
    {nom: 'Guyane', code: '973'},
    {nom: 'ile_de_france', code: '93'},
  ])
   
   constructor(private httpClient: HttpClient){}


   public getRegion = (): Observable<IDistrict[]> => {
     return this.httpClient.get<IDistrict[]>(this.REGION_API_URL)
   }

   public region = (): Observable<IDistrict[]> =>{
     return this.regions
   }


}