/*
* Utils Time functions
*/

module.exports = {

  pasted_time:(date)=>{
    //defining
    const msecPerMinute = 60000;
    const msecPerHour = 3600000;
    const msecPerDay = 86400000;
    const msecPerMonth = 2592000000;
    const msecPerYear = 31536000000;

    let currentDate = new Date();

    result = "";

    // Get the difference in milliseconds.
    let interval = currentDate - date.getTime();

    //Years, Months and days
    let years =  Math.floor(interval / msecPerYear );
    interval = interval - (years * msecPerYear );
    result += (years > 0)? years+" years ": "";

    let months =  Math.floor(interval / msecPerMonth );
    interval = interval - (months * msecPerMonth );
    result += (months > 0)? months+" months ": "";

    let days = Math.floor(interval / msecPerDay );
    interval = interval - (days * msecPerDay );
    result += (days > 0)? days+" days ": "";

    // Calculate the hours, minutes, and seconds.
    let hours = Math.floor(interval / msecPerHour );
    interval = interval - (hours * msecPerHour );
    result += (hours > 0)? hours+" hours ": "";

    let minutes = Math.floor(interval / msecPerMinute );
    interval = interval - (minutes * msecPerMinute );

    return result+minutes +" minutes ago";
  }

}
