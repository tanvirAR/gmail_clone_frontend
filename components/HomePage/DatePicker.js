import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


function DatePickerComponent() {
const [selectedDate, setSelectedDate] = useState('')
    return (
        <DatePicker 
        selected={selectedDate}
        onChange={(date) => selectedDate(date)}
        dateFormat= 'dd/MM/yyyy'
        minDate={new Date()}
        isClearable
        showYearDropdown
        scrollableYearDropdown
        />


    )
}