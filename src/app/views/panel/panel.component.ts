import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { collection } from 'firebase/firestore';
import { map, tap } from 'rxjs';
import { AddComponent } from './add/add.component';
import { Model } from './list/list.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements AfterViewChecked {
  sum: number = 0;
  constructor(public dialog: MatDialog, private firestore: Firestore, private auth: Auth, private route: Router) {
    const coll = collection(firestore, 'items');
    collectionData(coll).pipe(
      map(data => data as Model[]),
      tap(data => this.sum = data.reduce((previous, current) => previous + current.value, 0)))
      .subscribe();
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      if (!this.auth.currentUser)
        this.route.navigate(['/login']);
    }, 500);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddComponent);
  }
}
