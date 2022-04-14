type MaybeClassName = string | undefined | null | false;

/**
 * Facilitates concatenation of class names, especially when classNames shall
 * be applied conditionally
 * Similar to the JS packages clsx and classnames
 */
export function classNames(classes: Array<MaybeClassName>) {
  return classes.filter(Boolean).join(' ');
}
