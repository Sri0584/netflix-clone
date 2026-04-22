import useBaseMovies from '@/store/movieStore';
import useSearchMovies from '@/store/apiStore';

describe('Search flow e2e', () => {
  beforeEach(() => {
    useBaseMovies.setState({
      baseMovies: [
        { id: 10, title: 'Wednesday', poster_path: '/w.jpg' },
        { id: 11, title: 'Dexter', poster_path: '/d.jpg' },
        { id: 12, title: 'The Rookie', poster_path: '/r.jpg' },
      ],
    });

    useSearchMovies.setState({
      query: '',
      results: [],
    });
  });

  it('returns matching results as user refines query', () => {
    const searchState = useSearchMovies.getState();

    searchState.performSearch('de');
    expect(useSearchMovies.getState().results.map((movie) => movie.title)).toEqual([
      'Dexter',
    ]);

    searchState.performSearch('wed');
    expect(useSearchMovies.getState().results.map((movie) => movie.title)).toEqual([
      'Wednesday',
    ]);

    searchState.performSearch('');
    expect(useSearchMovies.getState().results).toEqual([]);
  });
});
