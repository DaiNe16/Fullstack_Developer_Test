
namespace Bai1.Repository
{
    public class ProductRepository : IProductRepository
    {
        public List<string> GetProducts()
        {
            return new List<string> { "Laptop", "Smartphone", "Tablet" };
        }
    }
}
