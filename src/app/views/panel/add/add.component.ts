import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addDoc, collection, CollectionReference, query } from 'firebase/firestore';
import { Model } from '../list/list.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  itemForm: FormGroup;

  constructor(private auth: Auth, private firestore: Firestore, private modal: DialogRef<AddComponent>) {
    this.itemForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      value: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit(): void { }

  add(): void {
    const { name, value } = this.itemForm.value;
    addDoc(
      collection(this.firestore, 'items'),
      { date: new Date(), user: this.auth.currentUser?.email || 'Sistema', name, value });
    this.modal.close();
  }
}
