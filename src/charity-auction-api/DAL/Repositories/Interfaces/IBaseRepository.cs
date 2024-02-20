using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IBaseRepository<TEntity, TKey> where TEntity : class
    {
        Task CreateAsync(TEntity item);
        Task CreateRangeAsync(IEnumerable<TEntity> items);
        Task DeleteAsync(TKey id);
        Task<IEnumerable<TEntity>> FindAsync(Func<TEntity, bool> predicate);
        Task<IEnumerable<TEntity>> FindAsyncNoTracking(Func<TEntity, bool> predicate);
        IQueryable<TEntity> GetAllAsQueryable();
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<IEnumerable<TEntity>> GetAllAsyncNoTracking();
        Task<TEntity> GetAsync(TKey id);
        Task UpdateAsync(TEntity item);
    }
}
