import { renderHook, act } from '@testing-library/react-hooks';
import { useItems } from './useItems';

describe('useItems hook', () => {
    test('should add and remove items', () => {
        const { result } = renderHook(() => useItems());
        console.debug(result.current);

        expect(result.current.items).toEqual([]);
        expect(result.current.items.length).toBe(0);

        act(() => {
            result.current.addItem('Playing Videogames');
            result.current.addItem('Playing Soccer');
            result.current.addItem('Playing Tennis');
        });

        expect(result.current.items.length).toBe(3);

        act(() => {
            result.current.removeItem(result.current.items[0].id);            
        });

        expect(result.current.items.length).toBe(2);
    });
});