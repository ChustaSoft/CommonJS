import { SortingType } from "..";

export { }
declare global {
    interface Array<T> {
        orderBy(this: Array<T>, property: string, sortingType?: SortingType): Array<T>;
        remove(element: T): Array<T>;
    }
}

if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function <T>(this: Array<T>, property: string, sortingType: SortingType = SortingType.ASCENDING): Array<T> {
        switch (sortingType) {
            case SortingType.ASCENDING:
                return this.sort((a, b) => (a[property] > b[property] ? 1 : -1));
            case SortingType.DESCENDING:
                return this.sort((a, b) => (a[property] < b[property] ? 1 : -1));
        }
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(this: T[], element: T): Array<T> {
        this.splice(this.indexOf(element), 1);

        return this;
    }
}