import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  palace:any
  temperature: number = 0;
  condition: string = '';
  isDay: boolean = true;
  loading: boolean = false;
  wind: any;
  humidity: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  loginForm: FormGroup = this.formBuilder.group({
    city: ['']
  });

  submitForm() {
    const city = this.loginForm.get('city')?.value;
    if (city) {
      this.loading = true; 
      const apiKey = '2bacea3e1c7305e30b11c9d0c41a9100';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      this.http.get(url).subscribe((data: any) => {
        console.log(data);
        this.temperature = data.main.temp;
        this.condition = data.weather[0].description;
        this.palace = data.name
        this.wind = data.wind.speed
        this.humidity = data.main.humidity;
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        const now = new Date();

        this.isDay = now > sunrise && now < sunset;
        this.loading = false; 
      }, error => {
        console.error('Error fetching weather data:', error);
        this.loading = false; 
      });
    }
  }

  ngOnInit(): void {
  }
}
