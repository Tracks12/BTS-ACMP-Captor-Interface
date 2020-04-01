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
			uname: null,
			upass: null
		});
	}

	onSubmit(data) {
		data.upass = btoa(data.upass);

		console.info(data);

		if(data.uname && data.upass)
			this.checkoutForm.reset();
	}

	ngOnInit() {

	}
}
