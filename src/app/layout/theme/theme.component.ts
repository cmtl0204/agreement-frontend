import {Component, inject, OnInit} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {AuthHttpService, AuthService, MenusHttpService} from "@servicesApp/auth";
import {CoreService, MessageService, RoutesService} from "@servicesApp/core";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected menus: MenuItem[] = [];
  protected bootstrapMenus: MenuItem[] = [];

  protected readonly coreService = inject(CoreService);
  protected readonly authService = inject(AuthService);
  protected readonly messageService = inject(MessageService);
  protected readonly routes = inject(RoutesService);
  protected sidebarVisible: boolean = false;

  constructor() {
    this.changeTheme(localStorage.getItem('theme') ? localStorage.getItem('theme')! : 'mdc-light-indigo');
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.bootstrapMenus = [
      {
        label: 'Bootstrap',
        items: [
          {
            label: 'bootstrap4-light-blue',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('bootstrap4-light-blue')
          },
          {
            label: 'bootstrap4-light-purple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('bootstrap4-light-purple')
          },
          {
            label: 'bootstrap4-dark-blue',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('bootstrap4-dark-blue')
          },
          {
            label: 'bootstrap4-dark-purple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('bootstrap4-dark-purple')
          },
        ]
      },
      {
        label: 'Material Design',
        items: [
          {
            label: 'md-light-indigo',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('md-light-indigo')
          },
          {
            label: 'md-light-deeppurple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('md-light-deeppurple')
          },
          {
            label: 'md-dark-indigo',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('md-dark-indigo')
          },
          {
            label: 'md-dark-deeppurple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('md-dark-deeppurple')
          },
          {
            label: 'mdc-light-indigo',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('mdc-light-indigo')
          },
          {
            label: 'mdc-light-deeppurple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('mdc-light-deeppurple')
          },
          {
            label: 'mdc-dark-indigo',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('mdc-dark-indigo')
          },
          {
            label: 'mdc-dark-deeppurple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('mdc-dark-deeppurple')
          },

        ]
      },
      {
        label: 'Fluent UI',
        items: [{
          label: 'fluent-light',
          icon: '',
          color: 'light-blue',
          command: () => this.changeTheme('fluent-light')
        },]
      },
      {
        label: 'PrimeOne Design',
        items: [
          {
            label: 'lara-light-blue',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('lara-light-blue')
          },
          {
            label: 'lara-light-indigo',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('lara-light-indigo')
          },
          {
            label: 'lara-light-purple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('lara-light-purple')
          },
          {
            label: 'lara-light-teal',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('lara-light-teal')
          },
          {
            label: 'lara-dark-blue',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('lara-dark-blue')
          },
          {
            label: 'lara-dark-indigo',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('lara-dark-indigo')
          },
          {
            label: 'lara-dark-purple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('lara-dark-purple')
          },
          {
            label: 'lara-dark-teal',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('lara-dark-teal')
          },

        ]
      },
      {
        label: 'Soho',
        items: [
          {
            label: 'soho-light',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('soho-light')
          },
          {
            label: 'soho-dark',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('soho-dark')
          },
        ]
      },
      {
        label: 'Viva',
        items: [{
          label: 'viva-light',
          icon: '',
          color: 'light-blue',
          command: () => this.changeTheme('viva-light')
        },
          {
            label: 'viva-dark',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('viva-dark')
          },]
      },
      {
        label: 'Saga',
        items: [{
          label: 'saga-blue',
          icon: '',
          color: 'light-blue',
          command: () => this.changeTheme('saga-blue')
        },
          {
            label: 'saga-green',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('saga-green')
          },
          {
            label: 'saga-orange',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('saga-orange')
          },
          {
            label: 'saga-purple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('saga-purple')
          },]
      },
      {
        label: 'Vela',
        items: [
          {
            label: 'vela-blue',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('vela-blue')
          },
          {
            label: 'vela-green',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('vela-green')
          },
          {
            label: 'vela-orange',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('vela-orange')
          },
          {
            label: 'vela-purple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('vela-purple')
          },
        ]
      },
      {
        label: 'Arya',
        items: [
          {
            label: 'arya-blue',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('arya-blue')
          },
          {
            label: 'arya-green',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('arya-green')
          },
          {
            label: 'arya-orange',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('arya-orange')
          },
          {
            label: 'arya-purple',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('arya-purple')
          },]
      },
      {
        label: 'Nova',
        items: [{
          label: 'nova',
          icon: '',
          color: 'light-blue',
          command: () => this.changeTheme('nova')
        },
          {
            label: 'nova-alt',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('nova-alt')
          },
          {
            label: 'nova-accent',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('nova-accent')
          },]
      },
      {
        label: 'Luna',
        items: [{
          label: 'luna-amber',
          icon: '',
          color: 'light-blue',
          command: () => this.changeTheme('luna-amber')
        },
          {
            label: 'luna-blue',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('luna-blue')
          },
          {
            label: 'luna-green',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('luna-green')
          },
          {
            label: 'luna-pink',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('luna-pink')
          },]
      },
      {
        label: 'Otros',
        items: [
          {
            label: 'mira',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('mira')
          },
          {
            label: 'nano',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('nano')
          },
          {
            label: 'rhea',
            icon: '',
            color: 'light-blue',
            command: () => this.changeTheme('rhea')
          },
        ]
      },
    ];
  }

  changeTheme(theme: string) {
    const element = document.getElementById('theme-css');
    if (element) {
      const urlTokens = element.getAttribute('href')?.split('/');
      if (urlTokens) {
        urlTokens[2] = theme;
        const newURL = urlTokens.join('/');
        this.replaceLink(element, newURL);
        localStorage.setItem('theme', theme);
      }
    }
  }

  replaceLink(linkElement: any, href: any) {
    const id = linkElement.getAttribute('id');
    const cloneLinkElement = linkElement.cloneNode(true);
    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
    cloneLinkElement.addEventListener('load', () => {
      linkElement.remove();
      cloneLinkElement.setAttribute('id', id);
    });
  }
}
