/* eslint-disable no-param-reassign */
import { DoX } from './DoX';

/**
 * Helper function to help build a horizontal doubly linked list.
 * @param e An existing node in the list.
 * @param n A new node to add to the right of the existing node.
 * @return
 */
export function addRight(e: DoX, n: DoX): DoX {
    n.R = e.R;
    n.L = e;
    e.R.L = n;
    e.R = n;
    return n;
}

/**
 * Helper function to help build a vertical doubly linked list.
 * @param e An existing node in the list.
 * @param n A new node to add below the existing node.
 */
export function addBelow(e: DoX, n: DoX): DoX {
    n.D = e.D;
    n.U = e;
    e.D.U = n;
    e.D = n;
    return n;
}
