import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthCredential } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import { map, tap } from 'rxjs';
import { AddComponent } from './add/add.component';
import { Model } from './list/list.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  sum: number = 0;
  constructor(public dialog: MatDialog, private firestore: Firestore) {
    const coll = collection(firestore, 'items');
    collectionData(coll).pipe(
      map(data => data as Model[]),
      tap(data => this.sum = data.reduce((previous, current) => previous + current.value, 0)))
      .subscribe();
  }

  ngOnInit(): void { }

  openDialog() {
    const dialogRef = this.dialog.open(AddComponent);
  }
}
