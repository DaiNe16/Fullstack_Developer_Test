using Bai2.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bai2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        [HttpGet("SeedStudentData")]
        public IActionResult SeedStudentData()
        {
            var students = Student.SeedStudentData();
            return Ok(students);
        }
        [HttpGet("SortStudent")]
        public IActionResult SortStudent()
        {
            var students = Student.SeedStudentData();
            //Sort
            Student.QuickSort(students, 0, students.Count - 1);
            return Ok(students);
        }
        [HttpGet("FindFastestStudentHasAvg8")]
        public IActionResult FindFastestStudentHasAvg8()
        {
            var students = Student.SeedStudentData();
            //Sort
            Student.QuickSort(students, 0, students.Count - 1);
            var index = Student.BinarySearchByAverage(students, 8);
            if(index == -1)
            {
                return NotFound();
            }
            return Ok(students[index]);
        }
    }
}
