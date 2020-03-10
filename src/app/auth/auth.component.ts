import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	checkoutForm;

  constructor(
		private formBuilder: FormBuilder
	) {
		this.checkoutForm = this.formBuilder.group({
			uname: '',
			upass: ''
		});
	}

	onSubmit(data) {
		console.log(data);

		this.checkoutForm.reset();
	}

	ngOnInit() {

	}
}
