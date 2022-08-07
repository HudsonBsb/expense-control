import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addDoc, collection } from 'firebase/firestore';
import { v4 } from 'uuid';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  itemForm: FormGroup;

  constructor(private firestore: Firestore, private modal: DialogRef<AddComponent>, private auth: Auth) {
    this.itemForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      value: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit(): void { }

  add(): void {
    const { name, value } = this.itemForm.value;
    const coll = collection(this.firestore, 'items');
    addDoc(coll, { date: new Date(), user: this.auth.currentUser?.email, name, value });
    this.modal.close();
  }
}
