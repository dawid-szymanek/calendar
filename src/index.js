import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayType: "Year",
      selectedDate: new Date(),
      dateToGoTo: new Date(),
      eventName: "",
      eventDate: new Date(),
      eventTime: new Date(),
      eventDesc: "",
      eventList: [
        {time: new Date(), name: "Example Event", desc: "Example Description"}
      ]
    }
    this.changeDisplayType = this.changeDisplayType.bind(this);
    this.changeSelectedDate = this.changeSelectedDate.bind(this);
    this.changeDateToGoTo = this.changeDateToGoTo.bind(this);
    this.changeEventName = this.changeEventName.bind(this);
    this.changeEventDate = this.changeEventDate.bind(this);
    this.changeEventTime = this.changeEventTime.bind(this);
    this.changeEventDesc = this.changeEventDesc.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  changeDisplayType(e) {
    e.preventDefault();
    this.setState({displayType: e.target.value});
    this.changeSelectedDate();
  }
  changeSelectedDate() {
    this.setState({selectedDate: this.state.dateToGoTo});
  }
  changeDateToGoTo(e) {
    e.preventDefault();
    let year = parseInt(e.target.value.substr(0,4));
    let month = parseInt(e.target.value.substr(5,6))-1;
    let day = parseInt(e.target.value.substr(8,9));
    this.setState({dateToGoTo: new Date(year, month, day)});
  }
  changeEventName(e) {
    e.preventDefault();
    this.setState({eventName: e.target.value});
  }
  changeEventDate(e) {
    e.preventDefault();
    let year = parseInt(e.target.value.substr(0,4));
    let month = parseInt(e.target.value.substr(5,6))-1;
    let day = parseInt(e.target.value.substr(8,9));
    this.setState({eventDate: new Date(year, month, day)});
  }
  changeEventTime(e) {
    e.preventDefault();
    let hour = e.target.value.substr(0,2);
    let minute = e.target.value.substr(3,5);
    this.setState({eventTime: new Date(0, 0, 0, hour, minute)});
  }
  changeEventDesc(e) {
    e.preventDefault();
    this.setState({eventDesc: e.target.value});
  }
  addEvent(e) {
    e.preventDefault();
    let date = this.state.eventDate;
    let time = this.state.eventTime;
    let temp = this.state.eventList;
    let temp2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
    temp.push({time: temp2, name: this.state.eventName, desc: this.state.eventDesc});
    this.setState({eventList: temp});
  }
  render() {
    return(
    <>
      <Main
        selectedDate={this.state.selectedDate}
        displayType={this.state.displayType}
        eventList={this.state.eventList}
      />
      <Side
        selectedDate={this.state.selectedDate}
        dateToGoTo={this.state.dateToGoTo}
        eventName={this.state.eventName}
        eventDate={this.state.eventDate}
        eventTime={this.state.eventTime}
        eventDesc={this.state.eventDesc}
        changeDisplayType={this.changeDisplayType}
        changeDateToGoTo={this.changeDateToGoTo}
        changeSelectedDate={this.changeSelectedDate}
        changeEventName={this.changeEventName}
        changeEventDate={this.changeEventDate}
        changeEventTime={this.changeEventTime}
        changeEventDesc={this.changeEventDesc}
        addEvent={this.addEvent}
      />
    </>
    )
  } 
}

function Main(props) {
  let display;
  if(props.displayType=="Year")
  {
    display = <YearDisplay selectedDate={props.selectedDate} eventList={props.eventList}/>
  }
  if(props.displayType=="Month")
  {
    display = <MonthDisplay selectedDate={props.selectedDate} eventList={props.eventList}/>
  }
  if(props.displayType=="Week")
  {
    display = <WeekDisplay selectedDate={props.selectedDate} eventList={props.eventList}/>
  }
  if(props.displayType=="Day")
  {
    display = <DayDisplay selectedDate={props.selectedDate} eventList={props.eventList}/>
  }
  return(
    <div id="main">
      {display}
    </div>
  )
}

function Side(props) {
  return(
    <div id="side">
      <GoToDate
        selectedDate={props.selectedDate}
        dateToGoTo={props.dateToGoTo}
        changeDisplayType={props.changeDisplayType}
        changeDateToGoTo={props.changeDateToGoTo}
        changeSelectedDate={props.changeSelectedDate}
      />
      <AddEvent
        eventName={props.eventName}
        eventDate={props.eventDate}
        eventTime={props.eventTime}
        eventDesc={props.eventDesc}
        changeEventName={props.changeEventName}
        changeEventDate={props.changeEventDate}
        changeEventTime={props.changeEventTime}
        changeEventDesc={props.changeEventDesc}
        addEvent={props.addEvent}
      />
    </div>
  )
}

function YearDisplay(props) {
  let date = props.selectedDate;
  let year = date.getFullYear();
  function filter(element) {
    return element.time.getFullYear() == year;
  }
  let list = props.eventList.filter(filter);
  let eventAmount = 0;
  for(let i=0; i<list.length; i++) {
    eventAmount++;
  }
  function checkEvents(month) {
    if(eventAmount>0) {
      let j=0;
      for(let i=0; i<eventAmount; i++) {
        if(list[i].time.getMonth()==month) j++;
      }
      return j>0 ? <div className="year_event">!!!</div> : "";
    }
  }
  return(
    <table id="year_display"><tbody>
      <tr>
        <th colSpan="4"><h1>{year}</h1></th>
      </tr>
      <tr>
        <td className="year_month">January {checkEvents(0)}</td>
        <td className="year_month">February {checkEvents(1)}</td>
        <td className="year_month">March {checkEvents(2)}</td>
        <td className="year_month">Apr {checkEvents(3)}</td>
      </tr>

      <tr>
        <td className="year_month">May {checkEvents(4)}</td>
        <td className="year_month">June {checkEvents(5)}</td>
        <td className="year_month">July {checkEvents(6)}</td>
        <td className="year_month">August {checkEvents(7)}</td>
      </tr>

      <tr>
        <td className="year_month">September {checkEvents(8)}</td>
        <td className="year_month">October {checkEvents(9)}</td>
        <td className="year_month">November {checkEvents(10)}</td>
        <td className="year_month">December {checkEvents(11)}</td>
      </tr>
    </tbody></table>
  )
}

function MonthDisplay(props) {
  let date = props.selectedDate;
  return(
    <table id="month_display"><tbody>
      <tr>
        <th colSpan="7" id="month_name">{date.toLocaleString('en-US', { month: 'long' })} {date.getFullYear()}</th>
      </tr>
      <tr>
        <th className="month_weekday">Mon</th>
        <th className="month_weekday">Tue</th>
        <th className="month_weekday">Wed</th>
        <th className="month_weekday">Thu</th>
        <th className="month_weekday">Fri</th>
        <th className="month_weekday">Sat</th>
        <th className="month_weekday">Sun</th>
      </tr>

      
      <tr>
        <Month_Day day="27"/>
        <Month_Day day="28"/>
        <Month_Day day="29"/>
        <Month_Day day="30"/>
        <Month_Day day="31"/>
        <Month_Day day="1"/>
        <Month_Day day="2"/>
      </tr>

      <tr>
        <Month_Day day="3"/>
        <Month_Day day="4"/>
        <Month_Day day="5"/>
        <Month_Day day="6"/>
        <Month_Day day="7"/>
        <Month_Day day="8"/>
        <Month_Day day="9"/>
      </tr>

      <tr>
        <Month_Day day="10"/>
        <Month_Day day="11"/>
        <Month_Day day="12"/>
        <Month_Day day="13"/>
        <Month_Day day="14"/>
        <Month_Day day="15"/>
        <Month_Day day="16"/>
      </tr>

      <tr>
        <Month_Day day="17"/>
        <Month_Day day="18"/>
        <Month_Day day="19"/>
        <Month_Day day="20"/>
        <Month_Day day="21"/>
        <Month_Day day="22"/>
        <Month_Day day="23"/>
      </tr>

      <tr>
        <Month_Day day="24"/>
        <Month_Day day="25"/>
        <Month_Day day="26"/>
        <Month_Day day="27"/>
        <Month_Day day="28"/>
        <Month_Day day="29"/>
        <Month_Day day="30"/>
      </tr>

      <tr>
        <Month_Day day="31"/>
        <Month_Day day="1"/>
        <Month_Day day="2"/>
        <Month_Day day="3"/>
        <Month_Day day="4"/>
        <Month_Day day="5"/>
        <Month_Day day="6"/>
      </tr>
    </tbody></table>
  )
}

function WeekDisplay(props) {
  let date = props.selectedDate;
  let eventAmount = 0;
  let isSunday;
  function filter(element) {
    switch(element.time.getDay()) {
      case 0:
        return date.getDate()>=element.time.getDate()-6 && date.getDate()<=element.time.getDate();
      case 1:
        return date.getDate()<=element.time.getDate()+6 && date.getDate()>=element.time.getDate();
      case 2:
        return date.getDate()<=element.time.getDate()+5 && date.getDate()>=element.time.getDate()-1;
      case 3:
        return date.getDate()<=element.time.getDate()+4 && date.getDate()>=element.time.getDate()-2;
      case 4:
        return date.getDate()<=element.time.getDate()+3 && date.getDate()>=element.time.getDate()-3;
      case 5:
        return date.getDate()<=element.time.getDate()+2 && date.getDate()>=element.time.getDate()-4;
      case 6:
        return date.getDate()<=element.time.getDate()+1 && date.getDate()>=element.time.getDate()-5;
      default:
        break;
    }
  }
  let list = props.eventList.filter(filter);
  function weekDate(weekDay) {
    if(date.getDay() == 0) {
      isSunday = true;
    }
    if(weekDay == date.getDay() || (weekDay == 7 && isSunday)) {
      return date.toLocaleString('en-US', { month: 'long' })+" "+date.getDate()+" "+date.getFullYear();
    }
    else if(!isSunday) for(let i=1; i<7; i++) {
      if(weekDay-i == date.getDay()) {
        let temp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        temp.setDate(date.getDate());
        temp.setDate(temp.getDate()+i);
        return temp.toLocaleString('en-US', { month: 'long' })+" "+temp.getDate()+" "+date.getFullYear();
      }
      else if(weekDay+i == date.getDay()) {
        let temp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        temp.setDate(date.getDate());
        temp.setDate(temp.getDate()-i);
        return temp.toLocaleString('en-US', { month: 'long' })+" "+temp.getDate()+" "+date.getFullYear();
      }
    } else for(let i=1, j=6; i<7; i++, j--) {
        if(weekDay-i == 0) {
          let temp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          temp.setDate(date.getDate());
          temp.setDate(temp.getDate()-j);
          return temp.toLocaleString('en-US', { month: 'long' })+" "+temp.getDate()+" "+date.getFullYear();
        }
      }
  }
  function weekDateAM(weekDay) {
    let events = "";
    for(let i=0; i<list.length; i++) {
      if((list[i].time.getDay() == weekDay || (weekDay==7 && list[i].time.getDay()==0)) && list[i].time.getHours()<12) {
        events += list[i].name+", ";
      }
    }
    return events;
  }
  function weekDatePM(weekDay) {
    let events = "";
    for(let i=0; i<list.length; i++) {
      if((list[i].time.getDay() == weekDay || (weekDay==7 && list[i].time.getDay()==0)) && list[i].time.getHours()>=12) {
        events += list[i].name+", ";
      }
    }
    return events;
  }
  let weekDays = <tr>
  <th className="week_day"></th>
  <th className="week_day">Monday,<br/>{weekDate(1)}</th>
  <th className="week_day">Tuesday,<br/>{weekDate(2)}</th>
  <th className="week_day">Wednesday,<br/>{weekDate(3)}</th>
  <th className="week_day">Thursday,<br/>{weekDate(4)}</th>
  <th className="week_day">Friday,<br/>{weekDate(5)}</th>
  <th className="week_day">Saturday,<br/>{weekDate(6)}</th>
  <th className="week_day">Sunday,<br/>{weekDate(7)}</th>
  </tr>;
  let am = <tr>
  <td className="week_day"><b>AM</b></td>
  <td className="week_am">{weekDateAM(1)}</td>
  <td className="week_am">{weekDateAM(2)}</td>
  <td className="week_am">{weekDateAM(3)}</td>
  <td className="week_am">{weekDateAM(4)}</td>
  <td className="week_am">{weekDateAM(5)}</td>
  <td className="week_am">{weekDateAM(6)}</td>
  <td className="week_am">{weekDateAM(7)}</td>
  </tr>;
  let pm = <tr>
  <td className="week_day"><b>PM</b></td>
  <td className="week_pm">{weekDatePM(1)}</td>
  <td className="week_pm">{weekDatePM(2)}</td>
  <td className="week_pm">{weekDatePM(3)}</td>
  <td className="week_pm">{weekDatePM(4)}</td>
  <td className="week_pm">{weekDatePM(5)}</td>
  <td className="week_pm">{weekDatePM(6)}</td>
  <td className="week_pm">{weekDatePM(7)}</td>
  </tr>;
  return(
    <table id="week_display"><tbody>
      {weekDays}
      {am}
      {pm}
    </tbody></table>
  )
}

function DayDisplay(props) {
  let dayDisplay;
  let date = props.selectedDate;
  function filter(element) {
    return element.time.getDate() == date.getDate();
  }
  let list = props.eventList.filter(filter);
  let eventAmount = 0;
  let monthName = date.toLocaleString('en-US', { month: 'long' });
  for(let i=0; i<list.length; i++)
  {
    eventAmount++;
  }
  if(eventAmount!=0) {
    dayDisplay = list.map((element, index)=>
      <div className="event" key={index}>
      -{element.time.getHours()}:{(element.time.getMinutes() < 10 ? '0' : '') + element.time.getMinutes()} - {element.name}<br/>
      {element.desc}<br/><br/>
      </div>
    );
  }
  else {
    dayDisplay = <h2>There aren't any events scheduled for this day</h2>
  }
  return(
    <div id="day_display">
      <div id="day">{date.getDate()} {monthName} {date.getFullYear()}</div>
      {dayDisplay}
    </div>
  )
}

function GoToDate(props) {
  let year=props.dateToGoTo.getFullYear();
  let month=props.dateToGoTo.getMonth()+1; month=(month < 10 ? '0' : '')+month;
  let day=(props.dateToGoTo.getDate() < 10 ? '0' : '')+props.dateToGoTo.getDate();
  return(
    <form>
      <h1>Go to date</h1>
      <input type="date" value={year+"-"+month+"-"+day} onChange={props.changeDateToGoTo}/><br/>
      <button type="button" value="Year" onClick={props.changeDisplayType}>Year</button>
      <button type="button" value="Month" onClick={props.changeDisplayType}>Month</button><br/>
      <button type="button" value="Week" onClick={props.changeDisplayType}>Week</button>
      <button type="button" value="Day" onClick={props.changeDisplayType}>Day</button>
    </form>
  )
}

function AddEvent(props) {
  let year=props.eventDate.getFullYear();
  let month=props.eventDate.getMonth()+1; month=(month < 10 ? '0' : '')+month;
  let day=(props.eventDate.getDate() < 10 ? '0' : '')+props.eventDate.getDate();
  let hour=(props.eventTime.getHours() < 10 ? '0' : '') + props.eventTime.getHours();
  let minute=(props.eventTime.getMinutes() < 10 ? '0' : '') + props.eventTime.getMinutes();
  return(
    <form>
      <h1>Add Event</h1>
      <input type="text" value={props.eventName} onChange={props.changeEventName}/><br/>
      <input type="date" value={year+"-"+month+"-"+day} onChange={props.changeEventDate}/><br/>
      <input type="time" value={hour+":"+minute} onChange={props.changeEventTime}/><br/>
      <textarea rows="4" columns="50" value={props.eventDesc} onChange={props.changeEventDesc}/><br/>
      <button type="button" onClick={props.addEvent}>Add</button>
    </form>
  )
}

function Month_Day(props) {
  return(
    <td className="month_day">{props.day}</td>
  )
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);

reportWebVitals();
