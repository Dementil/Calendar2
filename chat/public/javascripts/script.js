(function (global) {
    'use strict'

    var newMonth;

    function CreatMonth() {
        this.date = new Date();
        this.month = new Date().getMonth();
        this.dateLastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        this.dayWeekLast = new Date(this.date.getFullYear(), this.date.getMonth(), this.dateLastDay).getDay();
        this.dayWeekFirst = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.num = 0;
    }

    CreatMonth.prototype.render = function () {
        var parent = document.getElementById('wrapper'),
            calendar = document.createElement('div'),
            daysw = document.createElement('div'),
            days = document.createElement('div'),
            last = document.createElement('div'),
            next = document.createElement('div'),
            currentCal = document.createElement('div'),
            calMenu = document.createElement('div'),
            month = document.createElement('p'),
            year = document.createElement('p');


        parent.appendChild(calendar);
        calendar.appendChild(calMenu);
        calendar.appendChild(daysw);
        calendar.appendChild(days);
        calMenu.appendChild(last);
        calMenu.appendChild(currentCal);
        calMenu.appendChild(next);
        currentCal.appendChild(month);
        currentCal.appendChild(year);

        calendar.classList.add('calendar');

        last.setAttribute('class', 'fa fa-angle-left col-3 lastMonth');
        next.setAttribute('class', 'fa fa-angle-right col-3 nextMonth');


        last.setAttribute('id', 'last');
        currentCal.classList.add('col-6', 'currentCal');
        next.setAttribute('id', 'next');
        calMenu.classList.add('col-12', 'calMenu', 'row');
        daysw.classList.add('daysWeek', 'row');
        days.classList.add('grid')

        month.innerHTML = this.months[this.date.getMonth()];
        year.innerHTML = this.date.getFullYear();


        //рендерит дни недели в заголовке
        for (var i = 0; i < this.week.length; i++) {
            var dayweek = document.createElement('div');
            dayweek.innerHTML = this.week[i];
            dayweek.classList.add('weekDay');
            daysw.appendChild(dayweek);
        }

        if (this.dayWeekFirst != 0) {
            for (var i = 0; i < this.dayWeekFirst; i++) {
                var div = document.createElement('div');
                days.appendChild(div);
                div.classList.add('day');
                div.setAttribute('id', 'null');
                this.num += 1;
            }
        }

        //генерит дни
        for (var i = 1; i <= this.dateLastDay; i++) {
            var div1 = document.createElement('div');
            var div = document.createElement('div');
            var a = document.createElement('a');
            var p = document.createElement('p');
            var n = i;
            var m = 1 + this.month;
            div.classList.add('days');
            div1.classList.add('day');
            p.setAttribute('id', i);
            div.innerHTML = i;
            days.appendChild(a);
            days.appendChild(a);
            a.appendChild(div1);
            div1.appendChild(div);
            div1.appendChild(p);

            a.setAttribute('href', '#');
            a.setAttribute('data-toggle', 'modal');
            a.setAttribute('data-target', '#myModal');
            this.num += 1;

            if (i === new Date().getDate() && this.date.getMonth() === new Date().getMonth() && this.date.getFullYear() === new Date().getFullYear()) {
                div1.classList.add('today', 'day');
            }
        }

        this.switchCalendar();

    };

    CreatMonth.prototype.switchCalendar = function () {

        var date = this.date;
        var that = this;
        var parent = document.getElementById('wrapper');
        var calendar = document.querySelector('.calendar');
        calendar.addEventListener('click', function (event) {
            that.num = 0;
            if (event.target.id === 'last') {
                that.date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
                that.dateLastDay = new Date(that.date.getFullYear(), that.date.getMonth() + 1, 0).getDate();
                that.dayWeekLast = new Date(that.date.getFullYear(), that.date.getMonth(), that.dateLastDay).getDay();
                that.dayWeekFirst = new Date(that.date.getFullYear(), that.date.getMonth(), 1).getDay();
                parent.removeChild(calendar);
                that.month = that.date.getMonth();
                that.render();

            } else if (event.target.id === 'next') {
                that.date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
                that.dateLastDay = new Date(that.date.getFullYear(), that.date.getMonth() + 1, 0).getDate();
                that.dayWeekLast = new Date(that.date.getFullYear(), that.date.getMonth(), that.dateLastDay).getDay();
                that.dayWeekFirst = new Date(that.date.getFullYear(), that.date.getMonth(), 1).getDay();
                parent.removeChild(calendar);
                that.month = that.date.getMonth();
                that.render();

            }
        });
    };


    newMonth = new CreatMonth();
    newMonth.render();



    var socket = io.connect('http://localhost:3000/');


    socket.on("newEvent", function (answer) {

        var ds = new Date(answer.dt_start);
        var de = new Date(answer.dt_end);

        for (var j = ds.getDate(); j <= de.getDate(); j++) {
            var a = document.getElementById(j);
            a.innerHTML = answer.name;
            a.style.background = answer.color;
        };

    });



}(window));