//  DASHBOARD STATS 

fetch('/api/dashboard/stats')
  .then(res => res.json())
  .then(data => {
    animate('totalEmployees', data.totalEmployees);
    animate('presentToday', data.presentToday);
    animate('pendingLeaves', data.pendingLeaves);

    document.getElementById('monthlyPayroll').innerText =
      '₹ ' + (data.monthlyPayroll / 1000000).toFixed(1) + 'M';

    document.getElementById('attendanceBar').style.width =
      data.attendancePercent + '%';

    document.getElementById('notifCount').innerText =
      data.pendingLeaves;
  });


fetch('/api/employees')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('employeeTable');
    tbody.innerHTML = '';

    data.forEach(emp => {
      tbody.innerHTML += `
        <tr>
          <td>${emp.name}</td>
          <td>${emp.department}</td>
          <td>
            <span class="status ${emp.status}">
              ${emp.status === 'active' ? 'Active' : 'On Leave'}
            </span>
          </td>
          <td>${formatDate(emp.joined)}</td>
        </tr>
      `;
    });
  });


fetch('/api/activities')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('activityList');
    list.innerHTML = '';
    data.forEach(item => list.innerHTML += `<li>${item}</li>`);
  });

function animate(id,value){
  let el=document.getElementById(id),count=0;
  let step=Math.ceil(value/40);
  let i=setInterval(()=>{
    count+=step;
    if(count>=value){
      count=value;
      clearInterval(i);
    }
    el.innerText=count;
  },20);
}

function formatDate(date){
  return new Date(date).toLocaleDateString('en-IN',{
    day:'2-digit',
    month:'short',
    year:'numeric'
  });
}
