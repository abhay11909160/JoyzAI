import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  key: string;
  level: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  tree = {
    "a": ["b", "c"],
    "b": ["d", "e"],
    "c": ["f", "g"],
    "e": ["h", "i"],
    "f": ["j", "k"]
  };

  sortedTree = {};
  visibleTree: Item[] = [];

  sortTree(rootKey: string) {
    let sortChild = {};
    if(Object.keys(this.tree).includes(rootKey)) {
      for (const child of this.tree[rootKey]) {
        sortChild[child] = this.sortTree(child);
      }
    }
    return sortChild;
  }

  findRootKey() {
    const findKeySet = new Set(Object.keys(this.tree));
    const findValueSet = new Set(Object.values(this.tree).flat());
    for (const key of findKeySet) {
      if (!findValueSet.has(key)) {
        return key;
      }
    }
    return null;
  }

  sortTreeforUI(obj: any, level: number) {
    const finalStructure: any = [];
    const keys = Object.keys(obj);
    
    for (const key of keys) {
      finalStructure.push({ key, level });
      if (obj[key] && Object.keys(obj[key]).length > 0) {
        finalStructure.push(...this.sortTreeforUI(obj[key], level + 1));
      }
    }
    
    return finalStructure;
  }

  ngOnInit(): void {
    const rootKey = this.findRootKey();
    if(rootKey) {
      this.sortedTree[rootKey] = this.sortTree(rootKey);
    }
    console.log(this.sortedTree);
    this.visibleTree = this.sortTreeforUI(this.sortedTree, 0);
  }
}
