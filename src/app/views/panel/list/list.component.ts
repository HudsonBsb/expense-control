import { Component, OnInit } from '@angular/core';
import { collectionData, doc, Firestore, query } from '@angular/fire/firestore';
import { collection, CollectionReference, deleteDoc, Timestamp } from 'firebase/firestore';

export interface Model {
  docId: number;
  user: string;
  date: Timestamp;
  value: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'name', 'user', 'value', 'actions'];
  items: Model[] = [];
  constructor(private firestore: Firestore) {
    collectionData<Model>(
      query<Model>(
        collection(this.firestore, 'items') as CollectionReference<Model>
        // where('id', '==', element.id)
      ), { idField: 'docId' }
    ).subscribe(model => this.items = model);
  }

  ngOnInit(): void { }

  getDate(date: Timestamp): Date {
    return date.toDate();
  }

  del(element: Model): void {
    deleteDoc(doc(this.firestore, `items/${element.docId}`));
  }
}
