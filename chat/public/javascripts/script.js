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

        calendar.setAttribute('class', 'calendar col-6 offset-1');

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
            }
        }

        //Генерация календаря
        for (var i = 1; i <= this.dateLastDay; i++) {

            var div1 = document.createElement('div'),
                div = document.createElement('div'),
                p = document.createElement('p');
            var idDate = new Date(this.date.getFullYear(), this.date.getMonth(), i);

            div.classList.add('days');
            div1.classList.add('day');
            p.setAttribute('id', idDate);
            div.innerHTML = i;
            days.appendChild(div1);
            div1.appendChild(div);
            div1.appendChild(p);

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
            socket.emit('getEvents', function (data) { });
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

    ///Получение данных из формы через ajax
    $("form").submit(function (e) {
        e.preventDefault();
        var adminform = document.forms["adminform"],
            id_grp = document.getElementById('id_grp').value,
            dt_start = document.getElementById('dt_start').value,
            dt_end = document.getElementById('dt_end').value,
            name = document.getElementById('name').value,
            color = document.getElementById('color').value;

        $.ajax({
            type: "POST",
            url: "/",
            data: JSON.stringify({ id_grp: id_grp, dt_start: dt_start, dt_end: dt_end, name: name, color: color }),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                socket.emit('getEvents', function (data) { });
            },
        });
    });



    var socket = io.connect('http://localhost:3000/');
    socket.emit('getEvents', function (data) {
        //console.log(rows);
    });
    socket.on("newEvent", function (rows) {
        console.log(rows);

        for (var i = 0; i < rows.length; i++) {
            var obj = rows[i];

            var ds = new Date(obj.dt_start);
            var de = new Date(obj.dt_end);

            for (var j = ds.getDate(); j <= de.getDate(); j++) {
                var eventDay = new Date(ds.getFullYear(), ds.getMonth(), j);
                //console.log(eventDay);
                var pText;
                //console.log(pText);
                var p1 = document.createElement('p');
                if (pText = document.getElementById(eventDay)) {
                    pText.appendChild(p1);
                    var text = document.createTextNode(obj.name);
                    p1.appendChild(text);
                    p1.style.background = obj.color;
                };
            };
        };
    });

    clean.onclick = function cleanData() {
        document.getElementById('dt_start').value = '';
        document.getElementById('dt_end').value = '';
        document.getElementById('name').value = '';
        document.getElementById('color').value = "#000000";
    };
}(window));