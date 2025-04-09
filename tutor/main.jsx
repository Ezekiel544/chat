function Mymain () {
    const Firstname = "ezekiel"
    const Secondname =" chikezie"
    const Age = 25 
    const Hub = "rad5 tech hub"
    const Complexion = "fair"
    const Height = 5.7
    const Time = new Date().getHours()
    let Timeofday
    if (Time <12){
        Timeofday = 'morning'
    }else if (Time >= 12 || Time <17 ) {
        Timeofday = 'afternoon'
    } else if (Time >= 17 || Time <21 ) {
        Timeofday = 'evening'
    } else {
         Timeofday = 'night'
    }
    return(
       <>
          Gm everyone my name is {Firstname} {Secondname} ,i am {Age} years old and i attend {Hub} .
          i am {Complexion} in complexion and my height  is {Height} 
          it is currently {Timeofday}
        </>
    )
  }
  export default Mymain