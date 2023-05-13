export type IconProps = {
  className?: string;
};

export function IconDependify({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14 14">
      <path d="M10.0833 3.08333L7.04167 6.125L3.95833 3.08333L7.04167 0L10.0833 3.08333ZM14 7L10.9583 10.0833L7.91667 7L10.9583 3.95833L14 7ZM6.16667 7L3.08333 10.0833L0 7L3.08333 3.95833L6.16667 7ZM10.0833 10.9583L7.04167 14L3.95833 10.9583L7.04167 7.875L10.0833 10.9583Z" />
    </svg>
  );
}

export function IconSpinner({ className }: IconProps) {
  return (
    <svg fill="currentColor" className={className} viewBox="0 0 24 24">
      <style>
        {`.spinner_1KD7 { animation: spinner_6QnB 1.2s infinite; }
      .spinner_MJg4 { animation-delay: .1s; }
      .spinner_sj9X { animation-delay: .2s; }
      .spinner_WwCl { animation-delay: .3s; }
      .spinner_vy2J { animation-delay: .4s; }
      .spinner_os1F { animation-delay: .5s; }
      .spinner_l1Tw { animation-delay: .6s; }
      .spinner_WNEg { animation-delay: .7s; }
      .spinner_kugV { animation-delay: .8s; }
      .spinner_4zOl { animation-delay: .9s; }
      .spinner_7he2 { animation-delay: 1s; }
      .spinner_SeO7 { animation-delay: 1.1s; }
      @keyframes spinner_6QnB {
        0%, 50% { animation-timing-function: cubic-bezier(0.27, .42, .37, .99); r: 0; }
        25% { animation-timing-function: cubic-bezier(0.53, 0, .61, .73); r: 2px; }
      }`}
      </style>
      <circle className="spinner_1KD7" cx="12" cy="3" r="0" />
      <circle
        className="spinner_1KD7 spinner_MJg4"
        cx="16.50"
        cy="4.21"
        r="0"
      />
      <circle className="spinner_1KD7 spinner_SeO7" cx="7.50" cy="4.21" r="0" />
      <circle
        className="spinner_1KD7 spinner_sj9X"
        cx="19.79"
        cy="7.50"
        r="0"
      />
      <circle className="spinner_1KD7 spinner_7he2" cx="4.21" cy="7.50" r="0" />
      <circle
        className="spinner_1KD7 spinner_WwCl"
        cx="21.00"
        cy="12.00"
        r="0"
      />
      <circle
        className="spinner_1KD7 spinner_4zOl"
        cx="3.00"
        cy="12.00"
        r="0"
      />
      <circle
        className="spinner_1KD7 spinner_vy2J"
        cx="19.79"
        cy="16.50"
        r="0"
      />
      <circle
        className="spinner_1KD7 spinner_kugV"
        cx="4.21"
        cy="16.50"
        r="0"
      />
      <circle
        className="spinner_1KD7 spinner_os1F"
        cx="16.50"
        cy="19.79"
        r="0"
      />
      <circle
        className="spinner_1KD7 spinner_WNEg"
        cx="7.50"
        cy="19.79"
        r="0"
      />
      <circle className="spinner_1KD7 spinner_l1Tw" cx="12" cy="21" r="0" />
    </svg>
  );
}

export function IconKey({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M17 8.99994C17 8.48812 16.8047 7.9763 16.4142 7.58579C16.0237 7.19526 15.5118 7 15 7M15 15C18.3137 15 21 12.3137 21 9C21 5.68629 18.3137 3 15 3C11.6863 3 9 5.68629 9 9C9 9.27368 9.01832 9.54308 9.05381 9.80704C9.11218 10.2412 9.14136 10.4583 9.12172 10.5956C9.10125 10.7387 9.0752 10.8157 9.00469 10.9419C8.937 11.063 8.81771 11.1823 8.57913 11.4209L3.46863 16.5314C3.29568 16.7043 3.2092 16.7908 3.14736 16.8917C3.09253 16.9812 3.05213 17.0787 3.02763 17.1808C3 17.2959 3 17.4182 3 17.6627V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H7V19H9V17H11L12.5791 15.4209C12.8177 15.1823 12.937 15.063 13.0581 14.9953C13.1843 14.9248 13.2613 14.8987 13.4044 14.8783C13.5417 14.8586 13.7588 14.8878 14.193 14.9462C14.4569 14.9817 14.7263 15 15 15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconWifi({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 19.5C11 18.9477 11.4477 18.5 12 18.5H12.01C12.5623 18.5 13.01 18.9477 13.01 19.5C13.01 20.0523 12.5623 20.5 12.01 20.5H12C11.4477 20.5 11 20.0523 11 19.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 5.5C8.09395 5.5 4.53867 6.99161 1.86897 9.43803C1.46179 9.81115 0.829225 9.78355 0.4561 9.37636C0.0829746 8.96918 0.110582 8.33662 0.517762 7.9635C3.5418 5.19237 7.57436 3.5 11.9999 3.5C16.4254 3.5 20.458 5.19237 23.482 7.9635C23.8892 8.33662 23.9168 8.96918 23.5437 9.37636C23.1706 9.78355 22.538 9.81115 22.1308 9.43803C19.4611 6.99161 15.9058 5.5 11.9999 5.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 10.5C9.46665 10.5 7.15548 11.4407 5.39295 12.9933C4.97853 13.3584 4.34663 13.3184 3.98156 12.904C3.6165 12.4896 3.65651 11.8577 4.07093 11.4926C6.18465 9.6306 8.9615 8.5 12 8.5C15.0385 8.5 17.8153 9.6306 19.929 11.4926C20.3435 11.8577 20.3835 12.4896 20.0184 12.904C19.6533 13.3184 19.0214 13.3584 18.607 12.9933C16.8445 11.4407 14.5333 10.5 12 10.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 15.5C10.8186 15.5 9.73541 15.9084 8.87994 16.5926C8.44862 16.9375 7.81934 16.8675 7.4744 16.4361C7.12947 16.0048 7.1995 15.3755 7.63082 15.0306C8.82805 14.0732 10.3484 13.5 11.9999 13.5C13.6267 13.5 15.1264 14.0562 16.3153 14.9881C16.7499 15.3288 16.8261 15.9574 16.4854 16.392C16.1446 16.8267 15.5161 16.9028 15.0814 16.5621C14.2321 15.8964 13.1637 15.5 11.9999 15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconWifiOff({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L4.05356 5.46777C2.76797 6.14869 1.58058 6.98947 0.517762 7.96339C0.110582 8.33652 0.0829746 8.96908 0.4561 9.37626C0.829225 9.78344 1.46179 9.81105 1.86897 9.43792C2.95836 8.43965 4.19519 7.60049 5.5426 6.95681L7.83025 9.24447C6.4361 9.76113 5.16466 10.529 4.07093 11.4925C3.65651 11.8576 3.6165 12.4895 3.98157 12.9039C4.34664 13.3183 4.97854 13.3583 5.39296 12.9933C6.53546 11.9868 7.90822 11.2379 9.42113 10.8353L12.0863 13.5005C12.0576 13.5002 12.0288 13.5 11.9999 13.5C10.3484 13.5 8.82808 14.0732 7.63085 15.0306C7.19953 15.3755 7.1295 16.0048 7.47443 16.4361C7.81937 16.8675 8.44865 16.9375 8.87997 16.5926C8.93165 16.5512 8.98416 16.5109 9.03748 16.4716C9.06175 16.4573 9.08563 16.4418 9.10903 16.4252C9.95503 15.8241 10.9671 15.5012 12.0049 15.5012C12.8194 15.5012 13.618 15.7001 14.333 16.0763C14.5973 16.2161 14.8477 16.3789 15.0814 16.5621C15.138 16.6064 15.1978 16.6437 15.2598 16.674L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L3.70711 2.29289Z"
        fill="currentColor"
      />
      <path
        d="M10.3098 5.59816C10.8684 5.53482 11.4326 5.50269 11.9998 5.50269C15.652 5.50269 19.1788 6.83517 21.9186 9.2502C22.3329 9.6154 22.9648 9.57559 23.33 9.16129C23.6952 8.74698 23.6554 8.11507 23.2411 7.74987C20.136 5.01283 16.139 3.50269 11.9998 3.50269C11.357 3.50269 10.7176 3.53911 10.0845 3.61089C9.53569 3.67311 9.14126 4.16841 9.20348 4.71718C9.2657 5.26595 9.761 5.66038 10.3098 5.59816Z"
        fill="currentColor"
      />
      <path
        d="M15.6095 9.04529C15.0822 8.88101 14.5216 9.17528 14.3573 9.70256C14.193 10.2298 14.4873 10.7905 15.0146 10.9548C16.2585 11.3423 17.4241 11.9721 18.4401 12.8184C18.8645 13.1719 19.495 13.1144 19.8485 12.69C20.2019 12.2657 20.1445 11.6351 19.7201 11.2816C18.5009 10.2661 17.1022 9.51034 15.6095 9.04529Z"
        fill="currentColor"
      />
      <path
        d="M12 18.5C11.4477 18.5 11 18.9477 11 19.5C11 20.0523 11.4477 20.5 12 20.5H12.01C12.5623 20.5 13.01 20.0523 13.01 19.5C13.01 18.9477 12.5623 18.5 12.01 18.5H12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconGrid({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.56811 2C5.85605 2.00016 7.1465 2.00016 8.4319 2C8.68429 1.99997 8.93008 1.99994 9.13824 2.01695C9.36683 2.03563 9.63656 2.07969 9.90799 2.21799C10.2843 2.40974 10.5903 2.7157 10.782 3.09202C10.9203 3.36345 10.9644 3.63318 10.9831 3.86178C11.0001 4.06994 11 4.31574 11 4.56813V8.43189C11 8.68427 11.0001 8.93007 10.9831 9.13824C10.9644 9.36683 10.9203 9.63656 10.782 9.90799C10.5903 10.2843 10.2843 10.5903 9.90799 10.782C9.63656 10.9203 9.36683 10.9644 9.13824 10.9831C8.93007 11.0001 8.68427 11 8.43189 11H4.56812C4.31574 11 4.06994 11.0001 3.86178 10.9831C3.63318 10.9644 3.36345 10.9203 3.09202 10.782C2.7157 10.5903 2.40974 10.2843 2.21799 9.90799C2.07969 9.63656 2.03563 9.36683 2.01695 9.13824C1.99994 8.93008 1.99997 8.68429 2 8.4319C2 8.42128 2.00001 8.41065 2.00001 8.40001V4.60001C2.00001 4.58936 2 4.57873 2 4.56811C1.99997 4.31572 1.99994 4.06993 2.01695 3.86178C2.03563 3.63318 2.07969 3.36345 2.21799 3.09202C2.40974 2.7157 2.7157 2.40974 3.09202 2.21799C3.36345 2.07969 3.63318 2.03563 3.86178 2.01695C4.06993 1.99994 4.31572 1.99997 4.56811 2Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.56811 13C5.85605 13.0002 7.1465 13.0002 8.4319 13C8.68429 13 8.93008 12.9999 9.13824 13.017C9.36683 13.0356 9.63656 13.0797 9.90799 13.218C10.2843 13.4097 10.5903 13.7157 10.782 14.092C10.9203 14.3634 10.9644 14.6332 10.9831 14.8618C11.0001 15.0699 11 15.3157 11 15.5681V19.4319C11 19.6843 11.0001 19.9301 10.9831 20.1382C10.9644 20.3668 10.9203 20.6366 10.782 20.908C10.5903 21.2843 10.2843 21.5903 9.90799 21.782C9.63656 21.9203 9.36683 21.9644 9.13824 21.9831C8.93007 22.0001 8.68427 22 8.43189 22H4.56812C4.31574 22 4.06994 22.0001 3.86178 21.9831C3.63318 21.9644 3.36345 21.9203 3.09202 21.782C2.7157 21.5903 2.40974 21.2843 2.21799 20.908C2.07969 20.6366 2.03563 20.3668 2.01695 20.1382C1.99994 19.9301 1.99997 19.6843 2 19.4319C2 19.4213 2.00001 19.4106 2.00001 19.4V15.6C2.00001 15.5894 2 15.5787 2 15.5681C1.99997 15.3157 1.99994 15.0699 2.01695 14.8618C2.03563 14.6332 2.07969 14.3634 2.21799 14.092C2.40974 13.7157 2.7157 13.4097 3.09202 13.218C3.36345 13.0797 3.63318 13.0356 3.86178 13.017C4.06993 12.9999 4.31572 13 4.56811 13Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5681 2C16.856 2.00016 18.1465 2.00016 19.4319 2C19.6843 1.99997 19.9301 1.99994 20.1382 2.01695C20.3668 2.03563 20.6366 2.07969 20.908 2.21799C21.2843 2.40974 21.5903 2.7157 21.782 3.09202C21.9203 3.36345 21.9644 3.63318 21.9831 3.86178C22.0001 4.06994 22 4.31574 22 4.56813V8.43189C22 8.68427 22.0001 8.93007 21.9831 9.13824C21.9644 9.36683 21.9203 9.63656 21.782 9.90799C21.5903 10.2843 21.2843 10.5903 20.908 10.782C20.6366 10.9203 20.3668 10.9644 20.1382 10.9831C19.9301 11.0001 19.6843 11 19.4319 11H15.5681C15.3157 11 15.0699 11.0001 14.8618 10.9831C14.6332 10.9644 14.3634 10.9203 14.092 10.782C13.7157 10.5903 13.4097 10.2843 13.218 9.90799C13.0797 9.63656 13.0356 9.36683 13.017 9.13824C12.9999 8.93008 13 8.68429 13 8.4319C13 8.42128 13 8.41065 13 8.40001V4.60001C13 4.58936 13 4.57873 13 4.56811C13 4.31572 12.9999 4.06993 13.017 3.86178C13.0356 3.63318 13.0797 3.36345 13.218 3.09202C13.4097 2.7157 13.7157 2.40974 14.092 2.21799C14.3634 2.07969 14.6332 2.03563 14.8618 2.01695C15.0699 1.99994 15.3157 1.99997 15.5681 2Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5681 13C16.856 13.0002 18.1465 13.0002 19.4319 13C19.6843 13 19.9301 12.9999 20.1382 13.017C20.3668 13.0356 20.6366 13.0797 20.908 13.218C21.2843 13.4097 21.5903 13.7157 21.782 14.092C21.9203 14.3634 21.9644 14.6332 21.9831 14.8618C22.0001 15.0699 22 15.3157 22 15.5681V19.4319C22 19.6843 22.0001 19.9301 21.9831 20.1382C21.9644 20.3668 21.9203 20.6366 21.782 20.908C21.5903 21.2843 21.2843 21.5903 20.908 21.782C20.6366 21.9203 20.3668 21.9644 20.1382 21.9831C19.9301 22.0001 19.6843 22 19.4319 22H15.5681C15.3157 22 15.0699 22.0001 14.8618 21.9831C14.6332 21.9644 14.3634 21.9203 14.092 21.782C13.7157 21.5903 13.4097 21.2843 13.218 20.908C13.0797 20.6366 13.0356 20.3668 13.017 20.1382C12.9999 19.9301 13 19.6843 13 19.4319C13 19.4213 13 19.4106 13 19.4V15.6C13 15.5894 13 15.5787 13 15.5681C13 15.3157 12.9999 15.0699 13.017 14.8618C13.0356 14.6332 13.0797 14.3634 13.218 14.092C13.4097 13.7157 13.7157 13.4097 14.092 13.218C14.3634 13.0797 14.6332 13.0356 14.8618 13.017C15.0699 12.9999 15.3157 13 15.5681 13Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M10 6C10 5.44772 10.4477 5 11 5C14.3137 5 17 7.68629 17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 8.79086 13.2091 7 11 7C10.4477 7 10 6.55228 10 6Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.078 18.0319 16.6177L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.6177 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11ZM11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconDatabase({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M2.41485 13.5C2.53486 13.5 2.64799 13.553 2.73191 13.6387C2.84321 13.7525 2.96138 13.8572 3.08206 13.9528C3.66091 14.4115 4.43712 14.7802 5.30833 15.071C7.06109 15.6562 9.42324 16 12 16C14.5768 16 16.9389 15.6562 18.6917 15.071C19.5629 14.7802 20.3391 14.4115 20.9179 13.9528C21.0386 13.8572 21.1568 13.7525 21.2681 13.6387C21.352 13.553 21.4651 13.5 21.5851 13.5C21.8143 13.5 22 13.6857 22 13.9149V19C22 19.8494 21.4868 20.502 20.9179 20.9528C20.3391 21.4115 19.5629 21.7802 18.6917 22.071C16.9389 22.6562 14.5768 23 12 23C9.42324 23 7.06109 22.6562 5.30833 22.071C4.43712 21.7802 3.66091 21.4115 3.08206 20.9528C2.51319 20.502 2 19.8494 2 19V13.9149C2 13.6857 2.18574 13.5 2.41485 13.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.9117 3.04685C21.4811 3.49559 22 4.14805 22 5V10C22 10.8494 21.4868 11.502 20.9179 11.9528C20.3391 12.4115 19.5629 12.7802 18.6917 13.071C16.9389 13.6562 14.5768 14 12 14C9.42324 14 7.06109 13.6562 5.30833 13.071C4.43712 12.7802 3.66091 12.4115 3.08206 11.9528C2.51319 11.502 2 10.8494 2 10V5C2 4.14805 2.51889 3.49559 3.08829 3.04685C3.66896 2.58923 4.44724 2.22085 5.31981 1.93C7.07541 1.3448 9.43715 1 12 1C14.5629 1 16.9246 1.3448 18.6802 1.93C19.5528 2.22085 20.331 2.58923 20.9117 3.04685ZM4 4.99994C4 4.99994 3.99998 4.99479 4.00305 4.98471C4.00645 4.97356 4.01483 4.95155 4.03507 4.91857C4.07752 4.84943 4.16408 4.74547 4.32624 4.61768C4.65642 4.35747 5.19616 4.0794 5.95227 3.82736C7.45402 3.32678 9.59229 3 12 3C14.4077 3 16.546 3.32678 18.0477 3.82736C18.8038 4.0794 19.3436 4.35747 19.6738 4.61768C19.8359 4.74547 19.9225 4.84943 19.9649 4.91857C19.9852 4.95155 19.9935 4.97356 19.9969 4.98471C20 4.99479 20 5.00022 20 5.00022C20 5.00022 19.9999 5.00571 19.9969 5.01529C19.9935 5.02644 19.9852 5.04845 19.9649 5.08143C19.9225 5.15057 19.8359 5.25453 19.6738 5.38232C19.3436 5.64253 18.8038 5.9206 18.0477 6.17264C16.546 6.67322 14.4077 7 12 7C9.59229 7 7.45402 6.67322 5.95227 6.17264C5.19616 5.9206 4.65642 5.64253 4.32624 5.38232C4.16408 5.25453 4.07752 5.15057 4.03507 5.08143C4.01483 5.04845 4.00645 5.02644 4.00305 5.01529C4.00018 5.00584 4 4.99994 4 4.99994Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconNotification({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2806 5.72147C15.4223 5.34106 15.4999 4.92938 15.4999 4.5C15.4999 2.567 13.9329 1 11.9999 1C10.0669 1 8.49994 2.567 8.49994 4.5C8.49994 4.92938 8.57753 5.34107 8.71926 5.72148C8.13336 5.99626 7.58789 6.34658 7.10238 6.76736C5.77774 7.91537 4.99995 9.50571 4.99995 11.2C4.99995 13.3077 4.47969 14.7999 3.86723 15.8357L3.85708 15.8529C3.46329 16.5188 3.15567 17.0391 2.94938 17.4125C2.84627 17.5991 2.75553 17.7721 2.68957 17.9203C2.65685 17.9937 2.62077 18.0819 2.59265 18.1756C2.57169 18.2454 2.52011 18.4265 2.54156 18.6459C2.55334 18.7664 2.58036 19.0057 2.7197 19.25C2.85903 19.4942 3.05126 19.6393 3.14898 19.7108C3.30823 19.8272 3.46758 19.8772 3.54694 19.8991C3.6406 19.9251 3.73162 19.9404 3.80708 19.9505C3.95796 19.9707 4.13364 19.981 4.31675 19.9873C4.6818 20 5.19222 20 5.83538 20H8.12596C8.57 21.7252 10.1361 23 11.9999 23C13.8638 23 15.4299 21.7252 15.8739 20H18.1645C18.8076 20 19.3181 20 19.6831 19.9873C19.8663 19.981 20.0419 19.9707 20.1928 19.9505C20.2683 19.9404 20.3593 19.9251 20.453 19.8991C20.5323 19.8772 20.6917 19.8272 20.8509 19.7108C20.9486 19.6393 21.1409 19.4942 21.2802 19.25C21.4195 19.0057 21.4466 18.7664 21.4583 18.6459C21.4798 18.4265 21.4282 18.2454 21.4072 18.1756C21.3791 18.0819 21.343 17.9937 21.3103 17.9203C21.2444 17.7721 21.1536 17.5991 21.0505 17.4125C20.8442 17.0391 20.5367 16.519 20.1429 15.853L20.1327 15.8357C19.5202 14.7999 19 13.3077 19 11.2C19 9.50571 18.2222 7.91537 16.8975 6.76736C16.412 6.34658 15.8665 5.99625 15.2806 5.72147ZM11.9999 3C11.1715 3 10.4999 3.67157 10.4999 4.5C10.4999 4.72109 10.5474 4.93048 10.633 5.11912C11.0811 5.04027 11.5389 5 12 5C12.461 5 12.9188 5.04027 13.3669 5.11911C13.4525 4.93048 13.4999 4.72108 13.4999 4.5C13.4999 3.67157 12.8284 3 11.9999 3ZM10.2675 20C10.6133 20.5978 11.2597 21 11.9999 21C12.7402 21 13.3866 20.5978 13.7324 20H10.2675Z"
        fill="currentColor"
      />
      <path
        d="M5.07033 5.67396C5.55133 5.40256 5.72124 4.79262 5.44984 4.31162C5.17844 3.83062 4.5685 3.66071 4.0875 3.93211C2.50611 4.8244 1.5288 6.51715 1.54675 8.33282C1.55221 8.88507 2.00433 9.32834 2.55659 9.32288C3.10885 9.31742 3.55211 8.8653 3.54665 8.31305C3.53591 7.22602 4.12356 6.20817 5.07033 5.67396Z"
        fill="currentColor"
      />
      <path
        d="M18.55 4.31174C18.8214 3.83074 19.4313 3.66083 19.9123 3.93223C21.4937 4.82452 22.471 6.51727 22.4531 8.33293C22.4476 8.88519 21.9955 9.32846 21.4432 9.323C20.891 9.31754 20.4477 8.86542 20.4532 8.31317C20.4639 7.22614 19.8762 6.20829 18.9295 5.67408C18.4485 5.40268 18.2786 4.79274 18.55 4.31174Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconMonitor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M7.57181 21C8.90661 20.3598 10.41 20 12 20C13.59 20 15.0934 20.3598 16.4282 21M6.8 17H17.2C18.8802 17 19.7202 17 20.362 16.673C20.9265 16.3854 21.3854 15.9265 21.673 15.362C22 14.7202 22 13.8802 22 12.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V12.2C2 13.8802 2 14.7202 2.32698 15.362C2.6146 15.9265 3.07354 16.3854 3.63803 16.673C4.27976 17 5.11984 17 6.8 17Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMoon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M18 2L18.6178 3.23558C18.8833 3.76656 19.016 4.03205 19.1934 4.26211C19.3507 4.46626 19.5337 4.64927 19.7379 4.80664C19.9679 4.98397 20.2334 5.11672 20.7644 5.38221L22 6L20.7644 6.61779C20.2334 6.88328 19.9679 7.01603 19.7379 7.19336C19.5337 7.35073 19.3507 7.53374 19.1934 7.73789C19.016 7.96795 18.8833 8.23344 18.6178 8.76442L18 10L17.3822 8.76442C17.1167 8.23344 16.984 7.96795 16.8066 7.73789C16.6493 7.53374 16.4663 7.35073 16.2621 7.19336C16.0321 7.01603 15.7666 6.88328 15.2356 6.61779L14 6L15.2356 5.38221C15.7666 5.11672 16.0321 4.98397 16.2621 4.80664C16.4663 4.64927 16.6493 4.46626 16.8066 4.26211C16.984 4.03205 17.1167 3.76656 17.3822 3.23558L18 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 13.3893C19.689 15.689 17.2145 17.2395 14.3779 17.2395C10.1711 17.2395 6.76075 13.8292 6.76075 9.62233C6.76075 6.78554 8.31149 4.31094 10.6115 3C5.77979 3.45812 2 7.52692 2 12.4785C2 17.7371 6.26292 22 11.5215 22C16.4729 22 20.5415 18.2206 21 13.3893Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 1024 1024">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
        transform="scale(64)"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconLogout({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.7587 2H9C9.55229 2 10 2.44772 10 3C10 3.55229 9.55229 4 9 4H7.8C6.94342 4 6.36113 4.00078 5.91104 4.03755C5.47262 4.07337 5.24842 4.1383 5.09202 4.21799C4.7157 4.40973 4.40974 4.7157 4.21799 5.09202C4.1383 5.24842 4.07337 5.47262 4.03755 5.91104C4.00078 6.36113 4 6.94342 4 7.8L4 16.2C4 17.0566 4.00078 17.6389 4.03755 18.089C4.07337 18.5274 4.1383 18.7516 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.24842 19.8617 5.47262 19.9266 5.91104 19.9624C6.36113 19.9992 6.94342 20 7.8 20H9C9.55229 20 10 20.4477 10 21C10 21.5523 9.55229 22 9 22H7.75868C6.95372 22 6.28936 22 5.74818 21.9558C5.18608 21.9099 4.66937 21.8113 4.18404 21.564C3.43139 21.1805 2.81947 20.5686 2.43598 19.816C2.18868 19.3306 2.09012 18.8139 2.04419 18.2518C1.99998 17.7106 1.99999 17.0463 2 16.2413V7.75871C1.99999 6.95375 1.99998 6.28936 2.0442 5.74818C2.09012 5.18608 2.18869 4.66937 2.43598 4.18404C2.81947 3.43139 3.43139 2.81947 4.18404 2.43598C4.66938 2.18868 5.18608 2.09012 5.74818 2.04419C6.28937 1.99998 6.95374 1.99999 7.7587 2Z"
        fill="currentColor"
      />
      <path
        d="M15.2929 6.29289C15.6834 5.90237 16.3166 5.90237 16.7071 6.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L16.7071 17.7071C16.3166 18.0976 15.6834 18.0976 15.2929 17.7071C14.9024 17.3166 14.9024 16.6834 15.2929 16.2929L18.5858 13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H18.5858L15.2929 7.70711C14.9024 7.31658 14.9024 6.68342 15.2929 6.29289Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconChevron({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
