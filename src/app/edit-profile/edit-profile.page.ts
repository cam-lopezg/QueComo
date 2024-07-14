import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profile = {
    name: '',
    address: '',
    email: '',
    phone: ''
  };

  constructor(private sqlite: SQLite) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.sqlite.create({
      name: 'userdata.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS profile(name TEXT, address TEXT, email TEXT, phone TEXT)', [])
        .then(() => db.executeSql('SELECT * FROM profile', []))
        .then(data => {
          if (data.rows.length > 0) {
            this.profile.name = data.rows.item(0).name;
            this.profile.address = data.rows.item(0).address;
            this.profile.email = data.rows.item(0).email;
            this.profile.phone = data.rows.item(0).phone;
          }
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  saveProfile() {
    this.sqlite.create({
      name: 'userdata.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM profile', [])
        .then(() => {
          db.executeSql('INSERT INTO profile (name, address, email, phone) VALUES (?, ?, ?, ?)', 
            [this.profile.name, this.profile.address, this.profile.email, this.profile.phone])
            .then(() => console.log('Profile saved'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
