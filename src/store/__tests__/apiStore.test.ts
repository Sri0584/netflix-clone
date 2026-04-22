import useSearchMovies from '@/store/apiStore';
import useBaseMovies from '@/store/movieStore';

describe('useSearchMovies store', () => {
  beforeEach(() => {
    useSearchMovies.setState({ query: '', results: [] });
    useBaseMovies.setState({
      baseMovies: [
        { id: 1, title: 'Breaking Bad', poster_path: '/bb.jpg' },
        { id: 2, title: 'Dexter', poster_path: '/dx.jpg' },
      ],
    });
  });

  it('filters movies by title (case insensitive)', () => {
    useSearchMovies.getState().performSearch('break');

    const { query, results } = useSearchMovies.getState();
    expect(query).toBe('break');
    expect(results).toHaveLength(1);
    expect(results[0]?.title).toBe('Breaking Bad');
  });

  it('clears results for whitespace-only query', () => {
    useSearchMovies.setState({
      results: [{ id: 99, title: 'Existing Result', poster_path: '/existing.jpg' }],
    });

    useSearchMovies.getState().performSearch('   ');

    const { results } = useSearchMovies.getState();
    expect(results).toEqual([]);
  });
});
