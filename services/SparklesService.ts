export default class SparklesService {
  color = '#ff00f0';
  sparkles = 120;

  x = 400;
  ox = 400;
  y = 400;
  oy = 300;
  swide = 800;
  shigh = 600;
  sleft = 0;
  sdown = 0;
  tiny = new Array();
  star = new Array();
  starv = new Array();
  starx = new Array();
  stary = new Array();
  tinyx = new Array();
  tinyy = new Array();
  tinyv = new Array();

  // window.onload=
  onload() {
    // if (document.getElementById) {
      for (let i = 0; i < this.sparkles; i++) {
        let rats = this.createDiv(3, 3);
        rats.style.visibility = 'hidden';
        document.body.appendChild((this.tiny[i] = rats));
        this.starv[i] = 0;
        this.tinyv[i] = 0;
        rats = this.createDiv(5, 5);
        rats.style.backgroundColor = 'transparent';
        rats.style.visibility = 'hidden';
        let rlef = this.createDiv(1, 5);
        let rdow = this.createDiv(5, 1);
        rats.appendChild(rlef);
        rats.appendChild(rdow);
        rlef.style.top = '2px';
        rlef.style.left = '0px';
        rdow.style.top = '0px';
        rdow.style.left = '2px';
        document.body.appendChild((this.star[i] = rats));
      }
      this.set_width();
      this.sparkle();
    // }
  }

  sparkle() {
    let c;
    if (this.x != this.ox || this.y != this.oy) {
      this.ox = this.x;
      this.oy = this.y;
      for (c = 0; c < this.sparkles; c++)
        if (!this.starv[c]) {
          this.star[c].style.left = (this.starx[c] = this.x) + 'px';
          this.star[c].style.top = (this.stary[c] = this.y) + 'px';
          this.star[c].style.clip = 'rect(0px, 5px, 5px, 0px)';
          this.star[c].style.visibility = 'visible';
          this.starv[c] = 50;
          break;
        }
    }
    for (c = 0; c < this.sparkles; c++) {
      if (this.starv[c]) this.update_star(c);
      if (this.tinyv[c]) this.update_tiny(c);
    }
    setTimeout('sparkle()', 40);
  }

  update_star(i: number) {
    if (--this.starv[i] == 25)
      this.star[i].style.clip = 'rect(1px, 4px, 4px, 1px)';
    if (this.starv[i]) {
      this.stary[i] += 1 + Math.random() * 3;
      if (this.stary[i] < this.shigh + this.sdown) {
        this.star[i].style.top = this.stary[i] + 'px';
        this.starx[i] += ((i % 5) - 2) / 5;
        this.star[i].style.left = this.starx[i] + 'px';
      } else {
        this.star[i].style.visibility = 'hidden';
        this.starv[i] = 0;
        return;
      }
    } else {
      this.tinyv[i] = 50;
      this.tiny[i].style.top = (this.tinyy[i] = this.stary[i]) + 'px';
      this.tiny[i].style.left = (this.tinyx[i] = this.starx[i]) + 'px';
      this.tiny[i].style.width = '2px';
      this.tiny[i].style.height = '2px';
      this.star[i].style.visibility = 'hidden';
      this.tiny[i].style.visibility = 'visible';
    }
  }

  update_tiny(i: number) {
    if (--this.tinyv[i] == 25) {
      this.tiny[i].style.width = '1px';
      this.tiny[i].style.height = '1px';
    }
    if (this.tinyv[i]) {
      this.tinyy[i] += 1 + Math.random() * 3;
      if (this.tinyy[i] < this.shigh + this.sdown) {
        this.tiny[i].style.top = this.tinyy[i] + 'px';
        this.tinyx[i] += ((i % 5) - 2) / 5;
        this.tiny[i].style.left = this.tinyx[i] + 'px';
      } else {
        this.tiny[i].style.visibility = 'hidden';
        this.tinyv[i] = 0;
        return;
      }
    } else this.tiny[i].style.visibility = 'hidden';
  }

  // document.onmousemove= this.mouse;
  mouse(e: any) {
    this.set_scroll();
    // this.y = e ? e.pageY : event?.y + this.sdown;
    // this.x = e ? e.pageX : event?.x + this.sleft;
  }

  set_scroll() {
    if (typeof self.pageYOffset == 'number') {
      this.sdown = self.pageYOffset;
      this.sleft = self.pageXOffset;
    } else if (document.body.scrollTop || document.body.scrollLeft) {
      this.sdown = document.body.scrollTop;
      this.sleft = document.body.scrollLeft;
    } else if (
      document.documentElement &&
      (document.documentElement.scrollTop ||
        document.documentElement.scrollLeft)
    ) {
      this.sleft = document.documentElement.scrollLeft;
      this.sdown = document.documentElement.scrollTop;
    } else {
      this.sdown = 0;
      this.sleft = 0;
    }
  }

  // window.onresize=set_width;
  set_width() {
    if (typeof self.innerWidth == 'number') {
      this.swide = self.innerWidth;
      this.shigh = self.innerHeight;
    } else if (
      document.documentElement &&
      document.documentElement.clientWidth
    ) {
      this.swide = document.documentElement.clientWidth;
      this.shigh = document.documentElement.clientHeight;
    } else if (document.body.clientWidth) {
      this.swide = document.body.clientWidth;
      this.shigh = document.body.clientHeight;
    }
  }

  createDiv(height: string | number, width: string | number) {
    let div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.height = height + 'px';
    div.style.width = width + 'px';
    div.style.overflow = 'hidden';
    div.style.backgroundColor = this.color;
    return div;
  }
}
