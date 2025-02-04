namespace Bai2.Models
{
    public class Student
    {
        public string Name { get; set; }
        public Dictionary<string, int> Score { get; set; }

        public static List<Student> SeedStudentData()
        {
            return new List<Student>
            {
                new Student { Name = "Nguyen Van A2", Score = new Dictionary<string, int> { { "math", 7 }, { "physic", 9 }, { "chemistry", 7 } } },
                new Student { Name = "Tran Van B", Score = new Dictionary<string, int> { { "math", 8 }, { "physic", 8 }, { "chemistry", 8 } } },
                new Student { Name = "Nguyen Van A1", Score = new Dictionary<string, int> {  { "math", 9 }, { "physic", 7 }, { "chemistry", 7 } } },
                new Student { Name = "Le Thi D", Score = new Dictionary<string, int> {  { "math", 10 }, { "physic", 9 }, { "chemistry", 8 } } }
            };
        }
        public double GetAverageScore()
        {
            return Score.Values.Average();
        }
        public static void QuickSort(List<Student> students, int left, int right)
        {
            if (left >= right) return;

            int pivotIndex = Partition(students, left, right);
            QuickSort(students, left, pivotIndex - 1);
            QuickSort(students, pivotIndex + 1, right);
        }
        static int Partition(List<Student> students, int left, int right)
        {
            Student pivot = students[right];
            double pivotAvg = pivot.GetAverageScore();
            int i = left - 1;

            for (int j = left; j < right; j++)
            {
                double currentAvg = students[j].GetAverageScore();
                if (currentAvg > pivotAvg || (currentAvg == pivotAvg && string.Compare(students[j].Name, pivot.Name) < 0))
                {
                    i++;
                    Swap(students, i, j);
                }
            }
            Swap(students, i + 1, right);
            return i + 1;
        }
        static void Swap(List<Student> students, int i, int j)
        {
            Student temp = students[i];
            students[i] = students[j];
            students[j] = temp;
        }

        public static int BinarySearchByAverage(List<Student> students, double target)
        {
            int left = 0, right = students.Count - 1;

            while (left <= right)
            {
                int mid = left + (right - left) / 2;
                double midAvg = students[mid].GetAverageScore();

                if (Math.Round(midAvg, 2) == target)
                {
                    return mid;
                }
                else if (midAvg > target)
                {
                    left = mid + 1;
                }
                else
                {
                    right = mid - 1;
                }
            }
            return -1;
        }


    }
}
