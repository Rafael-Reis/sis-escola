import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//My Componentes
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import { ToastComponent } from './components/toast/toast.component';
import { FormInputDataComponent } from './components/form-input-data/form-input-data.component';
import { FormPermissaoComponent } from './components/form-permissao/form-permissao.component';

//Directive
import { PasswordDirective } from './diretivas/password.directive';

//OUTROS
import { NgxCurrencyModule } from "ngx-currency";
import { FileSaverModule } from 'ngx-filesaver';

// PIMENG
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService } from 'primeng/api';

import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToolbarModule} from 'primeng/toolbar';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextModule} from 'primeng/inputtext';
import {FieldsetModule} from 'primeng/fieldset';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {PanelModule} from 'primeng/panel';
import {ListboxModule} from 'primeng/listbox';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TabMenuModule} from 'primeng/tabmenu';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

const COMPONENTS = [
  ToastComponent,
  FormInputComponent,
  FormEditorComponent,
  FormInputDataComponent,
  FormPermissaoComponent
];

const PRIMENG = [
  MenuModule,
  MenubarModule,
  TableModule,
  AutoCompleteModule,
  ButtonModule,
  SplitButtonModule,
  DropdownModule,
  ToolbarModule,
  PaginatorModule,
  DialogModule,
  DynamicDialogModule,
  InputTextModule,
  InputMaskModule,
  FieldsetModule,
  RadioButtonModule,
  CardModule,
  TabViewModule,
  CheckboxModule,
  FileUploadModule,
  MessagesModule,
  MessageModule,
  ToastModule,
  CalendarModule,
  EditorModule,
  PanelModule,
  ListboxModule,
  SelectButtonModule,
  TabMenuModule,
  ProgressSpinnerModule
];

export const customCurrencyMaskConfig = {
    align: "left",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true
};

@NgModule({
  declarations: [
    COMPONENTS,
    FormInputDataComponent,
    PasswordDirective
  ],
  imports: [
    PRIMENG,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    FileSaverModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    PRIMENG,
    COMPONENTS,
    PasswordDirective,
    NgxCurrencyModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    MessageService,
    DialogService
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers:[MessageService, DialogService]
    }
  }

 }
