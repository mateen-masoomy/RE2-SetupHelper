export const FaTokenizer = (faClass, cssClass) => {
  return `<span class="fa-stack tokenized${cssClass ? ' ' + cssClass : ''}"><i class="fa-solid fa-circle fa-stack-2x"></i><i class="fa-solid fa-${faClass} fa-stack-1x contrast"></i></span>`;
};
