import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDistrict } from "src/app/shared/interface/IDistrict.interface";

@Injectable({
    providedIn: 'root'
})

export class DistrictService {
   private readonly REGION_API_URL = 'https://geo.api.gouv.fr/regions';
   
   constructor(private httpClient: HttpClient){}
   public getRegion = (): Observable<IDistrict[]> => {
     return this.httpClient.get<IDistrict[]>(this.REGION_API_URL)
   }
}